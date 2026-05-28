---
title: "CV"
---

<style>
/* Screen: hide the button area during normal browsing, show print button */
.cv-print-btn {
  margin-bottom: 2em;
}
.cv-print-btn button {
  background: none;
  border: 1px solid currentColor;
  padding: 0.4em 1.1em;
  cursor: pointer;
  font-size: 0.9em;
  border-radius: 3px;
  opacity: 0.7;
  transition: opacity 0.15s;
}
.cv-print-btn button:hover { opacity: 1; }

.cv-section { margin-bottom: 2em; }
.cv-section h2 {
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.2em;
  margin-bottom: 0.8em;
}
.cv-entry { margin-bottom: 1em; }
.cv-entry-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.2em;
}
.cv-entry-header .role { font-weight: bold; }
.cv-entry-header .date { opacity: 0.65; font-size: 0.9em; }
.cv-entry .org { font-style: italic; opacity: 0.8; }
.cv-entry p { margin: 0.3em 0 0; font-size: 0.92em; }
.cv-pills { display: flex; flex-wrap: wrap; gap: 0.4em; margin-top: 0.4em; }
.cv-pill {
  font-size: 0.8em;
  border: 1px solid currentColor;
  border-radius: 3px;
  padding: 0.1em 0.5em;
  opacity: 0.65;
}

@media print {
  .cv-print-btn { display: none; }
  nav, footer, .site-header, header { display: none !important; }
  body { font-size: 11pt; }
  a { color: inherit; text-decoration: none; }
  .cv-section h2 { page-break-after: avoid; }
  .cv-entry { page-break-inside: avoid; }
}
</style>

<div class="cv-print-btn">
  <button onclick="window.print()">⬇ Download as PDF</button>
</div>

# Rastislav Hronský

[mail@rhronsky.com](mailto:mail@rhronsky.com) &nbsp;·&nbsp; [hrasto.github.io](https://hrasto.github.io) &nbsp;·&nbsp; [GitHub](https://github.com/hrasto) &nbsp;·&nbsp; Tilburg, Netherlands

---

<div class="cv-section">

## Research Interests

language representation · tokenization · language model generalisation and domain drift · input representation and language codecs · distributional semantics · psycholinguistics and human language processing · evaluation methodology for NLP systems

Open to pivoting into: speech, robotics, energy grid management and load prediction, accessible language technologies, niche R&D.

</div>

<div class="cv-section">

## Education

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">PhD</span><span class="date">2020 – 2024</span></div>
<div class="org">Jheronimus Academy of Data Science / TU Eindhoven, 's-Hertogenbosch, NL</div>
<p>Thesis: <em>Between Digital Text and Language Model: Role of Context in Language Sampling, Segmentation, and Learning Representations</em>. Supervised by Emmanuel Keuleers. Topics: tokenization, evaluation, context-dependence, segmentation, unsupervised sentence representations, psycholinguistic modelling. Collaboration: systems for generating Chinese pseudocharacters. </p>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">MSc, Cognitive Science and Artificial Intelligence</span><span class="date">2019 – 2020</span></div>
<div class="org">Tilburg University, NL</div>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">BSc, Computer Science (Scientific Computing)</span><span class="date">2015 – 2018</span></div>
<div class="org">University of Vienna, AT</div>
</div>

</div>

<div class="cv-section">

## Experience

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">Lecturer</span><span class="date">Jul 2024 – Jul 2025</span></div>
<div class="org">Tilburg University, Dept. of Cognitive Science and AI · Part-time, on-site</div>
<p>Taught Deep Learning (MSc Data Science & Society) and Data Structures & Algorithms (BSc CSAI). Responsibilities: teaching, practicals, assignment design, examination design and grading. Supervised 7 MSc theses (DSS); second-reader for additional theses.</p>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">PhD Researcher</span><span class="date">Jun 2020 – Jun 2024</span></div>
<div class="org">Jheronimus Academy of Data Science (JADS), 's-Hertogenbosch, NL · Full-time</div>
<p>Research at the intersection of NLP and psycholinguistics. Trained and evaluated neural LMs (Transformers, LSTMs, CNNs) and classical NLP models (LDA, word2vec, LSA, n-grams) for text generation, word & sentence representation. PyTorch, HuggingFace. Designed and deployed text classification models for KPN (customer contact analytics). 5 peer-reviewed publications.</p>
<!-- <div class="cv-pills"><span class="cv-pill">PyTorch</span><span class="cv-pill">HuggingFace</span><span class="cv-pill">NLP</span><span class="cv-pill">LDA</span><span class="cv-pill">Transformers</span></div> -->
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">Teaching Assistant</span><span class="date">Aug 2019 – Jan 2020</span></div>
<div class="org">Tilburg University</div>
<p>Courses: Data Mining for Business & Governance; Machine Learning.</p>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">Research Intern</span><span class="date">Apr 2018 – Jul 2018</span></div>
<div class="org">VRVis GmbH, Vienna · Visual Analytics Group</div>
<p>Implemented t-SNE and DTW distance measures in the Visplore visual analytics system. Developed components for a recurrent pattern (motif) analysis dashboard for time-series data. C++, OpenGL, GTK.</p>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">Back-end & Mobile Developer</span><span class="date">Feb 2017 – Jul 2018</span></div>
<div class="org">Enterango GmbH, Austria · Part-time</div>
<p>Back-end development with Symfony (PHP, MySQL); Ionic mobile app development.</p>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">Software Developer Intern</span><span class="date">Jul 2016</span></div>
<div class="org">Siemens, Austria</div>
<p>Built a server-side data visualisation dashboard for the Energy Management department. LAMP stack, ChartJS.</p>
</div>

<div class="cv-entry">
<div class="cv-entry-header"><span class="role">Junior Web Developer</span><span class="date">Dec 2014 – May 2016</span></div>
<div class="org">JSWorks, Slovakia</div>
<p>Front-end implementations (HTML, CSS, JS, Google Maps API), PHP programming.</p>
</div>

</div>

<div class="cv-section">

## Publications

See the full [publications page](/publications/) for links and details.

**Hronský, R. & Keuleers, E. A.** (under review). *Addressing Sample Bias of Language Data in Vocabulary Creation and Evaluation.*

**Hronský, R. & Keuleers, E. A.** (2024). Tokenization via Language Modeling: The Role of Preceding Text. *CAWL Workshop at LREC-COLING.*

**Hronský, R. & Keuleers, E. A.** (2023). Role of Context in Unsupervised Sentence Representation Learning: The Case of Dialog Act Modeling. *Findings of EMNLP.*

**Hronský, R. & Keuleers, E. A.** (2022). Does the Choice of a Segmentation Algorithm Affect the Performance of Text Classifiers? *BNAIC/BeNeLearn.*

**Hronský, R. & Keuleers, E. A.** (2021). Word Probability Re-Estimation Using Topic Modeling and Lexical Decision Data. *Proceedings of the Annual Meeting of the Cognitive Science Society.*

</div>

<div class="cv-section">

## Skills (freshest)

<div class="cv-pills">
<span class="cv-pill">Python</span>
<span class="cv-pill">PyTorch</span>
<span class="cv-pill">HuggingFace Transformers</span>
<span class="cv-pill">scikit-learn</span>
<span class="cv-pill">NLP / text classification</span>
<span class="cv-pill">LDA / topic modelling</span>
<span class="cv-pill">LSTM / CNN / Transformer</span>
<span class="cv-pill">Git</span>
<span class="cv-pill">Academic Writing</span>
</div>

## Skills (refreshable)

<div class="cv-pills">
<span class="cv-pill">C++</span>
<span class="cv-pill">C#</span>
<span class="cv-pill">Unity</span>
<span class="cv-pill">PHP / Symfony</span>
<span class="cv-pill">JavaScript</span>
<span class="cv-pill">SQL</span>
</div>

</div>

<div class="cv-section">

## Languages

English (fluent) · German (fluent) · Slovak (native) · Dutch (basic) · Chinese (basic basic)

</div>

<div class="cv-section">

## Personal

Running (marathon PB 3:05) · Road cycling & mountain biking (raced as junior; currently spinning instructor) · Bike touring (Tilburg → Bratislava) · Powerlifting (5×5 @ 130 kg squat) · Interest in nutrition

</div>
