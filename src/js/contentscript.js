import "../img/icon-128.png";
import "../img/icon-34.png";

console.log("contentscript");

import { main } from "./popup/main";

chrome.runtime.onMessage.addListener(async m => {
  console.log(m);
  if (m.type !== "run") return;
  const res = await main(document);
  document.body.innerText = res.join(" ");
});
