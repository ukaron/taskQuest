const { ipcRenderer } = require("electron");
document
  .getElementById("toggleTransparencyBtn")
  .addEventListener("click", () => {
    ipcRenderer.send("make-transparent");
  });
