+++
title = 'Utilities for working with segmented corpora'
date = 2024-03-15T17:59:35+01:00
draft = false
+++

This weekend, I refreshed segutil (previously segmenters), a library containing Python structures suited for reading hierarchically segmented sequences. 
The corpus class in this package provides an interface for iterating over sequential data with respect to different segmentations, their combinations, and nested segments across increasing degree of granularity. 

Here is a super quick preview: 

    seq = 'theboysaidhithere'
    segmentations = {
        0: 'aaaaaaaaaabbbbbbb',
        1: 'iiiiiijjjjkklllll', 
        2: 'uuuvvvwwwwxxyyyyy',
    }
    sc = Corpus(seq, segmentations, packed=False)

In this example, the sentence "the boy said hi there" is segmented on three levels of granularity specified by the `segmentations` argument. 
You can now iterate over it using the `segments` method: 

    for seg in sc.segments(0,1,2): 
        pprint(seg)

    >>> {'data': [{'data': [{'data': ['t', 'h', 'e'], 'label': ('a', 'i', 'u')},
                            {'data': ['b', 'o', 'y'], 'label': ('a', 'i', 'v')}],
                'label': ('a', 'i')},
                {'data': [{'data': ['s', 'a', 'i', 'd'], 'label': ('a', 'j', 'w')}],
                'label': ('a', 'j')}],
        'label': ('a',)}
    >>> {'data': [{'data': [{'data': ['h', 'i'], 'label': ('b', 'k', 'x')}],
                'label': ('b', 'k')},
                {'data': [{'data': ['t', 'h', 'e', 'r', 'e'],
                            'label': ('b', 'l', 'y')}],
                'label': ('b', 'l')}],
        'label': ('b',)}

You may wish to to skip the intermediate level: 

    for seg in sc.segments(0,2): 
        pprint(seg)

    >>> {'data': [{'data': ['t', 'h', 'e'], 'label': ('a', 'u')},
                {'data': ['b', 'o', 'y'], 'label': ('a', 'v')},
                {'data': ['s', 'a', 'i', 'd'], 'label': ('a', 'w')}],
        'label': ('a',)}
    >>> {'data': [{'data': ['h', 'i'], 'label': ('b', 'x')},
                {'data': ['t', 'h', 'e', 'r', 'e'], 'label': ('b', 'y')}],
        'label': ('b',)}

Or simply iterate over a single level: 

    for seg in sc.segments(1): 
        pprint(seg)

    >>> {'data': ['t', 'h', 'e', 'b', 'o', 'y'], 'label': ('i',)}
    >>> {'data': ['s', 'a', 'i', 'd'], 'label': ('j',)}
    >>> {'data': ['h', 'i'], 'label': ('k',)}
    >>> {'data': ['t', 'h', 'e', 'r', 'e'], 'label': ('l',)}

### Install and Import

    pip install git+https://github.com/hrasto/segutil

Import via: 

    from segutil import *

Or:
    
    import segutil

(At the moment there are still other (old) modules in the package, but I will remove them in the future.)

### The Corpus Class

The most interesting class (`Corpus`) is made up of iterables and an optional `Vocab` object. 
The constructor takes the following arguments:

- **data** (iterable): Sequence of any kind of objects, e.g. integers.
- **segmentation** (iterable, list of iterables, or dict of iterables): Segmentation info. It can be specified as a single iterable (then a single segmentation with key `0` is assumed), a list of segmentations, or a dictionary of segmentations. 
- **packed** (bool, default True): Indicates the segmentation format. If `True`, the segmentation is represented by a sequence of tuples of form `(tag, segment_size)`. If `False`, then the segmentation is represented as a sequence of tags, e.g. `[A,A,A,B,B]`. (The packed equivalent would be `[(A,3), (B,2)]`.)
- **vocab** (instance of `Vocab` or `None` (default)): Vocabulary associated with the data. 

To create a corpus from a text file or a list of sentences, you can call: 

    corpus = Corpus.build_from_lines([
        'hello there', 
        'how are you ?',
    ], split_line=str.split, min_count=1, unk_token='<UNK>')

This creates the vocabulary autmatically. In addition, it stores the line segmentation under the `line_num` key: 

    for seg in corpus.segments('line_num'): 
        print(corpus.vocab.decode_sent(seg['data']), seg['label'])

    >>> ['hello', 'there'] (0,)
    >>> ['how', 'are', 'you', '?'] (1,)

### Chunking Corpus Example

To demonstrate a more intersting use case, I will use the corpus from the CoNLL 2000 chunking shared task. 
This corpus is annotated on the phrase-level (e.g. NP-noun phrase, VP-verb phrase, etc.), and on the word level (part-of-speech tags). 
To build this corpus, having the original CoNLL-format corpus downloaded, do: 

    corpus = Corpus.build_conll_chunk(
        root = 'path/to/corpus/folder',
        fileids = ['test.txt'], # take the test split only
        chunk_types = None, 
    )

This helper also loads various chunking-specific segmentations: 

    print(corpus.list_available_segmentations())

    >>> ['POS', 'chunk_type', 'sent_num', 'chunk_num']

Now you can iterate over the corpus using any of the segmentations, or their combinations. For example: 

    for seg in corpus.segments('chunk_type'):
        ...

    for seg in corpus.segments(('chunk_type', 'chunk_num')):
        ...
    
    for seg in corpus.segments(('chunk_type', 'POS')):
        ...

etc. 

However, the function `corpus.segments` accepts any amount of segmentation arguments.
When more than one segmentation is passed, this indicates hierarchical segmentation. 
The order of the segmentations is expected to correspond from coarse- to fine-grained.
For example, you can iterate over sentences grouped into chunks: 

    for seg in corpus.segments('sent_num', 'chunk_num'): 
        print(f'sent. {seg["label"]}')
        for subseg in seg['data']: 
            print(f'chunk {subseg["label"]}')
            print(corpus.vocab.decode_sent(subseg['data']))

    >>> sent. (0,)
    >>> chunk (0, 0)
    >>> ['Rockwell', 'International', 'Corp.']
    >>> chunk (0, 1)
    >>> ["'s", 'Tulsa', 'unit']
    >>> chunk (0, 2)
    >>> ['said']
    >>> chunk (0, 3)
    ...

When specifying the fine-grained segmentation in this way, it will be automatically modified such that any segment boundary present in the coarse segmentation will also be added to the fine-grained segmentation, if it already isn't there. 

Finally, to persistently store a corpus object, you can call:

    corpus.save('path/to/corpus.pkl')

This command uses the `pickle` module to store the object. 
However, before storing, it converts all iterators to lists, such that no information is lost. 
To load a corpus, you can use: 

    Corpus.load('path/to/corpus.pkl')

(Or simply load it via the `pickle` module.)
