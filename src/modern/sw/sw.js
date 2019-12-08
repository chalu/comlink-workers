/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts("https://unpkg.com/comlink@4.2.0/dist/umd/comlink.js");
importScripts("./sw.analyzer.js");

addEventListener("install", () => self.skipWaiting());
addEventListener("activate", () => self.clients.claim());

addEventListener("message", ({ data }) => {
  if (data.isHandshake === true) {
    Comlink.expose(Analyzer, data.port);
  }
});
