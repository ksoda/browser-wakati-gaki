import "../css/popup.css";
import "../img/icon-34.png";

console.log("load");
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  console.log(tabs);
  chrome.tabs.sendMessage(tabs[0].id, { type: "run" });
});
