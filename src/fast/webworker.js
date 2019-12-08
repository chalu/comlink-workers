/* eslint-disable no-restricted-globals  */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import { Analyzer } from "../analyzer.js";

self.addEventListener("message", ({ data }) => {
  const { stats } = Analyzer.analyzeText(data);
  self.postMessage({ stats });
});
