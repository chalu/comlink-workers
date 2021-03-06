/**
 * Text Analyzer module for service workers
 * @module Analyzer
 */

const pipe = (...fns) => {
  return data => {
    return fns.reduce((payload, fn) => fn(payload), data);
  };
};

const busy = ({ maxWait = 10000 } = {}) =>
  new Promise(resolve => {
    const delay = Math.round(Math.random() * maxWait);
    setTimeout(resolve, delay);
  });

const massageData = payload => {
  payload.text = (payload.text || "").trim();
  payload.stats = {};
  return payload;
};

const countChars = payload => {
  const { text } = payload;
  payload.stats.chars = text.length;
  return payload;
};

const countWords = payload => {
  const { text } = payload;
  payload.stats.words = text.split(/\s+/g).length;
  return payload;
};

const countLines = payload => {
  const { text } = payload;
  payload.stats.lines = text.split(/\n/g).length;
  return payload;
};

const findMostUsedWord = payload => {
  const { text } = payload;
  const wordMap = text
    .toLowerCase()
    .split(/\s+/g)
    .reduce((map, word) => {
      if (word.length >= 2) {
        const w = word.replace(/\W/g, "");
        map[w] = (map[w] || 0) + 1;
      }
      return map;
    }, {});

  const [mostUsed] = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);
  payload.stats.mostUsed = mostUsed;

  return payload;
};

// adapted from https://gist.github.com/sqren/5083d73f184acae0c5b7
const clogCPUByWordCount = payload => {
  /* eslint-disable no-restricted-properties */
  /* eslint-disable no-unused-expressions */
  const num = payload.stats.words;
  for (let i = Math.pow(num, 7); i >= 0; i -= 1) {
    Math.atan(i) * Math.tan(i);
  }

  return payload;
};

const analyze = pipe(
  massageData,
  countChars,
  countWords,
  countLines,
  findMostUsedWord,
  clogCPUByWordCount
);

const checkGrammar = async () => {
  await busy(); // e.g calling a remote grammar checker API
  return {
    grammarErrors: 0,
    spellingErrors: 0
  };
};

/**
 * exposed Analyzer "API"
 */
const Analyzer = {
  /**
   * analyze the provided text for character, word and line count.
   * also determines most used word.
   * the analysis will be representated by an object containing
   * 'chars', 'words', 'lines', and 'mostUsed' fields, all of which are
   * numbers except 'mostUsed' which is an array of the most used word and
   * how many times it occurs in the text
   * @param {string} text text to analyze
   * @returns {object} object with a 'stats' property representing the analysis
   */
  analyzeText(text) {
    return analyze({ text });
  },

  /**
   * simulate asynchrounous spelling and grammar analysis on the provided text
   * @param {string} text text to analyze grammer on
   * @param {function} callback main thread function to call when async analysis is complete
   */
  async analyzeGrammar(text, callback) {
    const status = await checkGrammar(text);
    callback({ status });
  }
};
