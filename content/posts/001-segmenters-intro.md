+++
title = 'Python helpers for working with segmented corpora'
date = 2024-03-15T17:59:35+01:00
draft = false
+++

This weekend, I refreshed my segmenters library. 
The previous version was already public on GitHub for quite some time, but the code was unnecessarily complicated and bad.
The new code is much shorter, simpler and also more functional.
Hence, I decided to post a short update on the usage. 

First, to install, do: 

    pip install git+https://github.com/hrasto/segmenters

The helpers can be imported via the following command: 

    from segmenters import *

This contains the namespace of the modules `iterator` and `corpus`.
(At the moment there are still other (old) modules in the package, but I will remove them in the future.)

The most interesting class (`SegmentedCorpus`) is made up of iterables and an optional `Vocab` object. 
The constructor takes the following arguments:

- **data** (iterable): Sequence of any kind of objects, e.g. integers.
- **segmentation** (iterable, list of iterables, or dict of iterables): Segmentation info. It can be specified as a single iterable (then a single segmentation with key `0` is assumed), a list of segmentations, or a dictionary of segmentations. 
- **packed** (bool, devault True): Indicates the segmentation format. If `True`, the segmentation is represented by a sequence of tuples of form `(tag, segment_size)`. If `False`, then the segmentation is represented as a sequence of tags, e.g. `[A,A,A,B,B]`. (The packed equivalent would be `[(A,3), (B,2)]`.)
- **vocab** (instance of `Vocab` or `None` (default)): Vocabulary associated with the data. 

A vocabulary object can be created by calling `Vocab.build`,  for example: 

    vcb = Vocab.build(list('abc'), min_count=1, unk_token='<UNK>')

To create a corpus from a text file or a list of sentences, you can call: 

    corpus = SegmentedCorpus.build_from_lines([
        'hello there'.split(), 
        'how are you ?'.split(),
    ], split_line=str.split, min_count=1, unk_token='<UNK>')

This creates the vocabulary autmatically. In addition, it stores the line segmentation under the `line_num` key: 

    for segments in corpus.segments('line_num'): 
        print(corpus.vocab.decode_sent(segments['data']), segments['label'])

    >>> ['hello', 'there'] (0,)
    >>> ['how', 'are', 'you', '?'] (1,)

To demonstrate a more intersting use case, I will use the corpus from the CoNLL 2000 chunking shared task. 
This corpus is annotated on the phrase-level (e.g. NP-noun phrase, VP-verb phrase, etc.), and on the word level (part-of-speech tags). 
To build this corpus, having the original CoNLL-format corpus downloaded, do: 

    corpus = SegmentedCorpus.build_conll(
        root = 'path/to/corpus/folder',
        fileids = ['test.txt'], # take the test split only
        chunk_types = None, 
    )

This helper building function also loads various chunking-specific segmentations: 

    print(corpus.list_available_segmentations())

    >>> ['POS', 'chunk_type', 'sent_num', 'chunk_num']

Now you can iterate over the corpus using any of the segmentations or their combinations, for example: 

    for seg in corpus.segments('chunk_type'):
        ...

    for seg in corpus.segments(('chunk_type', 'chunk_num')):
        ...
    
    for seg in corpus.segments(('chunk_type', 'POS')):
        ...

etc. 

The function `corpus.segments` segments also has a second parameter (`fine`). 
The default value is `None` and it indicates that the elements of a segment should be the data points themselves. 
However, you can also iterate with respect to a different fine-grained segmentation.
For example, you can set the coarse segmentation to be the sentences, and the the fine grained segmentation to be some phrase-level segmentation, such as chunks, in this case:

    for Seg in corpus.segments(coarse='sent_num', fine='chunk_num'): 
        print(f'sent. {Seg["label_coarse"]}')
        for seg in Seg['segments']: 
            print(f'chunk {seg["label_fine"]}')
            print(corpus.vocab.decode_sent(seg['data']))

    >>> sent. (0,)
    >>> chunk (0, 0)
    >>> ['Rockwell', 'International', 'Corp.']
    >>> chunk (0, 1)
    >>> ["'s", 'Tulsa', 'unit']
    >>> chunk (0, 2)
    >>> ['said']
    >>> chunk (0, 3)
    ...

When specifying a fine-grained segmentation this way, it will be automatically modified such that any segment boundary present in the coarse segmentation will also be added to the fine-grained segmentation, if it already isn't there. 

Finally, to persistently store a corpus object, you can call:

    corpus.save('path/to/corpus.pkl')

This command uses the `pickle` module to store the object. 
However, before storing, it converts all iterators to lists, such that no information is lost. 
To load a corpus, you can use: 

    SegmentedCorpus.load('path/to/corpus.pkl')

(Or simply load it via the `pickle` module.)