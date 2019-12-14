/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts("https://unpkg.com/comlink@4.2.0/dist/umd/comlink.js");
importScripts("./sw.analyzer.js");

addEventListener("install", () => self.skipWaiting());
addEventListener("activate", () => self.clients.claim());

addEventListener("message", ({ data }) => {
  // expose the Analyzer "API" when
  // we hear from the ui-thread that
  // it is ready to interact with this
  // ServiceWorker
  if (data.isHandshake === true) {
    Comlink.expose(Analyzer, data.port);
  }
});
