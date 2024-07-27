const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  let isLock = false;
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    alwaysOnTop: false,
    transparent: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  const consoleWindow = win.webContents;
  consoleWindow.openDevTools();
  win.loadURL("http://localhost:5173/");

  ipcMain.on("make-transparent", () => {
    if (!isLock) {
      win.setAlwaysOnTop(true);
      // win.setMovable(false);
      // win.setResizable(false);
      win.setOpacity(0.8); // Change this value for different levels of transparency
    } else {
      win.setAlwaysOnTop(false);
      win.setMovable(true);
      win.setResizable(true);
      win.setOpacity(1); // Change this value for different levels of transparency
    }
    isLock = !isLock;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
