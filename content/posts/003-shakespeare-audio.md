+++
title = 'Shakespeare audio: a tiny text and speech corpus'
date = 2024-07-06T12:00:00+01:00
draft = false
+++

The [tinyshakespeare](https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt) miniature corpus (~1MB) by Andrej Karpathy is a convenient resource for language model prototyping purposes.
Recently I found myself in need of a tinyshakespear-like audio corpus, so I decided to write a script that makes one.
The script and instructions are on [github](https://github.com/hrasto/shakespeare-audio). 

The corpus is based on ~10 hours of Shakespeare play recordings in English, and contains voices of several female and male speakers.
The procedure is a bit less elegant, as I did not want to copy and store any audio files.
But it is not that complicated either - you need to clone a github repository, optionally install ffmpeg and sox, run the script and wait.
It automatically downloads everything from [LibriVox](https://librivox.org), installs [whisper.cpp](https://github.com/ggerganov/whisper.cpp) to create transcripts with timestamps, converts the mp3s to wavs, downsamples them to 8bit*8kHz, and splits everything into a train and test set.

At the end, you will have three types of resources for each split:

- .txt file (just like the tinyshakespeare one),
- .csv file with token-by-token timestamps,
- .wav file containing the raw waveform (1x high-res 16bit\*16kHz and 1x low-res 8bit\*8kHz)

These are the resulting files sizes:


| split | .txt  | .wav (8kHz) | duration |
| ------- | ------- | ------------- | ---------- |
| train | 328kB | 217.6MB     | 7:33:21  |
| test  | 91kB  | 58.8MB      | 2:02:32  |

By default, the script combines the act recordings of 3 Shakespeare plays (Romeo & Juliet, Hamlet, and As You Like It), but it can be easily configured to download more from LibriVox.
See [github](https://github.com/hrasto/shakespeare-audio) for more detailed instructions!
