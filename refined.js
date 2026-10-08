"use strict";

/**
 * ToolyTools / Soft Minimalism
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

// Soft Minimal folder overlay — four folders, keyboard/focus support.
// Tool cards intentionally remain demo-only and never navigate to guessed URLs.
const folderData = {
  utilities: {
    title:"Utilities",
    description:"Small helpers for everyday tasks.",
    tools:[["equals","=","Calculator","Everyday calculations in one place.",1]]
  },
  generators: {
    title:"Generators",
    description:"Create something useful in a few clicks.",
    tools:[
      ["ww","WW","Workout Wallpaper","Turn your training goals into a wallpaper.",2],
      ["ca","CA","CA Tool","Generator concept preview.",3]
    ]
  },
  fitness: {
    title:"Fitness & Running",
    description:"Tools for running and fitness.",
    tools:[
      ["pc","PC","Pace Calculator","Calculate pace, splits and finish times.",4],
      ["ar","AR","AFTERRUN","Turn your runs into clear insights.",5],
      ["mo","MO","Monthy","Track your monthly running progress.",6],
      ["tp","TP","Taper","Plan your taper for race day.",7]
    ]
  },
  developer: {
    title:"Developer Tools",
    description:"Useful tools for building and testing.",
    tools:[["ld","LD","LD Tool","Developer utility concept preview.",8]]
  }
};
const folderButtons = [...document.querySelectorAll("[data-folder]")];
const folderBackdrop = document.getElementById("folder-backdrop");
const folderDialog = document.getElementById("folder-dialog");
const folderTitle = document.getElementById("folder-dialog-title");
const folderDescription = document.getElementById("folder-dialog-description");
const folderTools = document.getElementById("folder-tools");
const folderCount = document.getElementById("folder-tool-count");
const closeFolderButton = document.getElementById("close-folder");
const toast = document.getElementById("demo-toast");
let lastFocusedFolder = null;

function openFolder(folderId) {
  const entry = folderData[folderId];
  if (!entry) return;
  // Restore focus to the actual opener even on touch devices, where a tap
  // does not always move document.activeElement onto the clicked button.
  lastFocusedFolder = folderButtons.find(button => button.dataset.folder === folderId) || document.activeElement;
  folderTitle.textContent = entry.title;
  folderDescription.textContent = entry.description;
  folderCount.textContent = entry.tools.length + (entry.tools.length === 1 ? " tool" : " tools");
  folderTools.replaceChildren();
  for (const [id, abbr, name, explanation, color] of entry.tools) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "modal-tool";
    card.dataset.tool = id;
    card.setAttribute("aria-label",name + " — preview only");
    const tile = document.createElement("span");
    tile.className = "modal-tool__icon";
    tile.style.setProperty("--tool-color", "var(--tile-" + color + ")");
    tile.style.setProperty("--tool-ink", "var(--tile-ink)");
    tile.textContent = abbr;
    const label = document.createElement("span");
    label.className = "modal-tool__name";
    label.textContent = name;
    const detail = document.createElement("span");
    detail.className = "modal-tool__description";
    detail.textContent = explanation;
    const arrow = document.createElement("span");
    arrow.className = "modal-tool__arrow";
    arrow.setAttribute("aria-hidden","true");
    arrow.textContent = "↗";
    const content = document.createElement("span");
    content.className = "modal-tool__content";
    content.append(label,detail);
    card.append(tile,content,arrow);
    card.addEventListener("click", () => {
      toast.textContent = name + " · หน้านี้เป็นตัวอย่าง UI ยังไม่ได้เชื่อมต่อเครื่องมือจริง";
      toast.hidden = false;
      window.setTimeout(() => { toast.hidden = true; }, 2700);
    });
    folderTools.append(card);
  }
  toast.hidden = true;
  folderBackdrop.hidden = false;
  document.body.classList.add("folder-dialog-open");
  folderDialog.focus({preventScroll:true});
}
function closeFolder() {
  if (folderBackdrop.hidden) return;
  folderBackdrop.hidden = true;
  toast.hidden = true;
  document.body.classList.remove("folder-dialog-open");
  if (lastFocusedFolder && lastFocusedFolder.isConnected) {
    lastFocusedFolder.focus({preventScroll:true});
  }
  lastFocusedFolder = null;
}
folderButtons.forEach(button => button.addEventListener("click", () => openFolder(button.dataset.folder)));
closeFolderButton.addEventListener("click", closeFolder);
folderBackdrop.addEventListener("click", event => {
  if (event.target === folderBackdrop) closeFolder();
});
document.addEventListener("keydown", event => {
  if (folderBackdrop.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeFolder();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [closeFolderButton,...folderTools.querySelectorAll("button")];
  const first = focusable[0];
  const last = focusable[focusable.length-1];
  if (event.shiftKey && (document.activeElement === first || document.activeElement === folderDialog)){
    event.preventDefault();last.focus();
  }else if (!event.shiftKey && document.activeElement === last){
    event.preventDefault();first.focus();
  }else if (document.activeElement === folderDialog){
    event.preventDefault();first.focus();
  }
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
