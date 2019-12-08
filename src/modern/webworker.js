/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { expose } from "https://unpkg.com/comlink@4.2.0/dist/esm/comlink.mjs";
import { Analyzer } from "../analyzer.js";

// expose the Analyzer "API"
expose(Analyzer);
