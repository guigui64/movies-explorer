const { app, dialog, BrowserWindow, Menu } = require("electron");

const isMac = process.platform === "darwin";

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL("http://localhost:3000");

  // Open folder action
  const openFolder = () => {
    const folder = dialog.showOpenDialogSync({
      title: "Import folder",
      properties: ["openDirectory"],
    });
    folder && win.webContents.send("folder", folder[0]);
    // TODO save to cache + find all movie files recursively + progress bar
  };

  // Menu
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Import folder",
          accelerator: "CommandOrControl+I",
          click: openFolder,
        },
        { type: "separator" },
        { role: isMac ? "close" : "quit" },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
