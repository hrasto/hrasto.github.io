+++
title = 'Shakespeare Audio'
date = 2024-07-06T12:00:00+01:00
draft = false
+++

Inspired by the popular [tinyshakespeare](https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt) corpus by Andrej Karpathy, I created a python script that downloads and builds an audio corpus for language modeling experiments.

The way this works is (1) you need to clone a repository, and (2) run the python script.
I don't store any files in the repository, since audio files are not as tiny as text files, and they are publicly available at [LibriVox](https://librivox.org) anyways.
Although the final result is not as elegant, I hope it is not that user-unfriendly either.

The nice thing is that it also installs [whisper.cpp](https://github.com/ggerganov/whisper.cpp) and creates token-by-token transcriptions of the audio with timestamps. 
This way, it is easy to analyze word representations, etc.

Head to [github](https://github.com/hrasto/shakespeare-audio) for more details!