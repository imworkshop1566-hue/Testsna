"use strict";

/**
 * ToolyTools / Refined Neo-Brutalism
 * Only Light and Dark. Uses CSS semantic variables for every part of this demo.
 * No dependencies, third-party libraries, or live ToolyTools changes.
 */
const STORAGE_MODE = "toolytools-refined-mode";
const STORAGE_CONSENT = "toolytools-refined-cookie-demo";
const root = document.documentElement;
const buttons = [...document.querySelectorAll("[data-mode-switch]")];
const banner = document.getElementById("cookie-banner");
const cookieReset = document.getElementById("show-cookie");
const goal = document.getElementById("kit-goal");
const format = document.getElementById("kit-format");
const resultTitle = document.getElementById("kit-result-title");
const resultInfo = document.getElementById("kit-result-info");
const kitList = document.getElementById("kit-list");
const rail = document.querySelector(".folder-grid");

function getSaved(key) {
  try { return localStorage.getItem(key); } catch (_) { return null; }
}
function save(key, value) {
  try { localStorage.setItem(key, value); } catch (_) {}
}
function getInitialMode() {
  const saved = getSaved(STORAGE_MODE);
  if (saved === "dark" || saved === "light") return saved;
  return typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyMode(mode) {
  const next = mode === "dark" ? "dark" : "light";
  root.dataset.mode = next;
  buttons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.modeSwitch === next));
  });
  save(STORAGE_MODE, next);
}
buttons.forEach(button => {
  button.addEventListener("click", () => applyMode(button.dataset.modeSwitch));
});
applyMode(getInitialMode());

// Cookie banner is a visual demonstration, not a consent integration.
if (getSaved(STORAGE_CONSENT) === "accept" || getSaved(STORAGE_CONSENT) === "decline") {
  banner.hidden = true;
}
document.querySelectorAll("[data-dismiss-cookie]").forEach(button => {
  button.addEventListener("click", () => {
    banner.hidden = true;
    save(STORAGE_CONSENT, button.dataset.dismissCookie);
  });
});
cookieReset.addEventListener("click", () => {
  banner.hidden = false;
  try { localStorage.removeItem(STORAGE_CONSENT); } catch (_) {}
});

// Original four-folder row scrolls horizontally on mobile and supports keyboard.
rail.setAttribute("aria-label", "Tool folders — swipe sideways or use arrow keys");
rail.addEventListener("keydown", event => {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  rail.scrollBy({ left: event.key === "ArrowRight" ? 225 : -225,
                  behavior: reducedMotion ? "instant" : "smooth" });
});

// Interactive controls exist solely to demonstrate shared design tokens.
function updateResult() {
  const amount = Math.min(999, Math.max(1, Number(goal.value) || 70));
  goal.value = String(amount);
  resultTitle.textContent = amount + " km · " + format.value;
  resultInfo.textContent = "Updated sample — " +
    (root.dataset.mode === "dark" ? "Dark" : "Light") + " appearance";
}
document.getElementById("kit-generate").addEventListener("click", updateResult);
document.getElementById("kit-reset").addEventListener("click", () => {
  goal.value = "70";
  format.value = "Portrait";
  updateResult();
});

const examples = Object.freeze({
  tools: [
    ["Workout Wallpaper", "Fitness & Running", "Ready"],
    ["GPX Studio", "Route editing", "Updated"],
    ["Calculator", "Utilities", "Ready"]
  ],
  activity: [
    ["Hill repeats", "Training plan", "Completed"],
    ["Color settings", "Light & Dark", "Saved"],
    ["Component preview", "Style Lab", "Updated"]
  ]
});
function showTab(key) {
  const records = examples[key];
  if (!records) return;
  document.querySelectorAll("[data-kit-tab]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.kitTab === key));
  });
  kitList.replaceChildren();
  for (const [title, subtitle, status] of records) {
    const row = document.createElement("div");
    row.className = "kit-list__item";
    const details = document.createElement("div");
    const heading = document.createElement("div");
    heading.className = "kit-list__title";
    heading.textContent = title;
    const sub = document.createElement("div");
    sub.className = "kit-list__sub";
    sub.textContent = subtitle;
    const pill = document.createElement("span");
    pill.className = "kit-pill";
    pill.textContent = status;
    details.append(heading, sub);
    row.append(details, pill);
    kitList.append(row);
  }
}
document.querySelectorAll("[data-kit-tab]").forEach(button => {
  button.addEventListener("click", () => showTab(button.dataset.kitTab));
});
showTab("tools");
