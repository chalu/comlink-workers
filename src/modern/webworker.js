/* eslint-disable no-restricted-globals  */
/* eslint-disable no-undef */

importScripts("https://unpkg.com/comlink@4.2.0/dist/umd/comlink.js");
importScripts("./analyzer.js");

// expose the Analyzer "API"
Comlink.expose(Analyzer);
