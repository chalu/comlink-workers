/* eslint-disable no-restricted-globals  */
/* eslint-disable no-undef */

importScripts("https://unpkg.com/comlink@4.2.0/dist/umd/comlink.js");
importScripts("../analyzer.js");

addEventListener("install", () => self.skipWaiting());
addEventListener("activate", () => self.clients.claim());

addEventListener("message", ({ data }) => {
  if (data.isHandshake === true) {
    Comlink.expose(Analyzer, data.port);
  }
});
