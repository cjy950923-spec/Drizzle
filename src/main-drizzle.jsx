import React from "react";
import ReactDOM from "react-dom/client";
import { DrizzleApp } from "./DrizzleApp.jsx";
import "./styles/global.css";

const ua = navigator.userAgent ?? "";
const isIOS = /iPhone|iPad|iPod/i.test(ua);
const isSafari =
  /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|SamsungBrowser/i.test(ua);
const isIOSWebView = isIOS && !isSafari;
const isAndroidWebView =
  /Android/i.test(ua) &&
  (/\bwv\b/i.test(ua) ||
    /Version\/[\d.]+.*Chrome\/[\d.]+.*Mobile/i.test(ua));
const isStandalone =
  window.matchMedia?.("(display-mode: standalone)")?.matches === true ||
  window.navigator.standalone === true;
const isWebViewRuntime = isIOSWebView || isAndroidWebView || isStandalone;

document.documentElement.dataset.runtime = isWebViewRuntime
  ? "webview"
  : "browser";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Missing root element "#root"');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <DrizzleApp />
  </React.StrictMode>,
);
