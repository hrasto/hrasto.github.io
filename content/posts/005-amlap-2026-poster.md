+++
title = 'AMLaP 2026 poster: Word Frequency Calibration'
date = 2026-07-02
draft = false
+++

I will be presenting a poster at AMLaP 2026, co-authored with Emmanuel Keuleers.

## A brief introduction

In psycholinguistics, researchers often rely on word frequency data to predict an outcome. For example, when predicting for how long a participant fixates their eyes on a word in sentence reading, or how much time they take to decide whether they know a presented word or not, word frequency plays a key role. Although in psycholinguistic experiments word frequency is used as if it was stable, word frequency is not stable: estimates for words outside of the high-frequency band (i.e., beyond the most frequent words such as articles, pronouns, etc.) are highly context-dependent. (By context, here we mean influences such as the literary genre, the time epoch a text is written in, who the author is, the topic of the text, etc.) This challenges the theoretical underpinning of word frequency as a proxy for the rate with which words occur in a participants' language environment. One can hardly assume that the statistics of mid- to low-frequency words from any single corpus, no matter how large, universally represent the experience with language for any set of human individuals.

To explore this issue, we used topic models, which I will briefly introduce. A topic model can be seen as an algorithm that takes a collection of documents, and looks at words that tend to co-occur together within any one document. Based on these statistics, it derives "topics", which can be seen as standalone axes that govern a document's lexical composition. One artifact of a topic model is a collection of per-topic word probability lists: every topic assigns a probability value to every distinct word. Such a list, or a mixture of lists, can be used as a drop-in replacement for the standard word frequency list, which is obtained by counting up words in a corpus. 

In 2021, we published an article where we used topic models to show that topic mixtures can explain several percentage-points more variance in lexical decision times than classic frequencies. However, this work only showed a "skyline" of how much percentage topics can explain, when using the target variable itself to calibrate the topic mixture. In the abstract submitted to AMLaP, we experimented with external "seeds" to calibrate the mixture instead. The procedure and results are presented in the abstract -- see it for yourself, if interested: 

- [Read about word frequency calibration in the abstract](/amlap2026-word-frequency.pdf)
- [Check the code on GitHub](https://github.com/hrasto/amlap26-word-frequency-calibration)
