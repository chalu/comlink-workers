importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

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
  const wordMap = text.split(/\s+/g).reduce((map, word) => {
    if (word.trim().length >= 2) {
      word = word.replace(/\W/g, "").toLowerCase();
      map[word] = (map[word] || 0) + 1;
    }
    return map;
  }, {});

  const [mostUsed] = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);
  payload.stats.mostUsed = mostUsed;

  return payload;
};

// adapted from https://gist.github.com/sqren/5083d73f184acae0c5b7
const clogCPUByCharsLen = payload => {
  /* eslint-disable no-restricted-properties */
  /* eslint-disable no-unused-expressions */
  const num = payload.stats.chars;
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
  clogCPUByCharsLen
);

const checkGrammer = async () => {
  await busy(); // e.g calling a remote grammer checker API
  return {
    grammerErrors: 0,
    spellingErrors: 0
  };
};

// externalised "API" object
const Analyzer = {
  analyzeText(text) {
    return analyze({ text });
  },

  async analyzeGrammer(text, callback) {
    // call async spelling and grammer checker
    // then send the results back to the main thread
    // by calling the callback function with it
    // console.log('calling grammer checker');
    const status = await checkGrammer(text);
    callback({ status });
  }
};

// expose the "API"
Comlink.expose(Analyzer);
