
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 700,
    minHeight: 500,
    title: "EARTH-LOADING",
    autoHideMenuBar: true,
    backgroundColor: "#e8faff",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "inde.html"));
}

ipcMain.handle("fullscreen:toggle", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  if (!win) return false;

  win.setFullScreen(!win.isFullScreen());

  return win.isFullScreen();
});

ipcMain.handle("fullscreen:get", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  return win ? win.isFullScreen() : false;
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
