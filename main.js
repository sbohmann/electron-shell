const { app, BrowserWindow } = require('electron');
const path = require("node:path")

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow
        .loadFile(path.join(__dirname, 'app.html'))
        .catch(error => console.log(error))

    // mainWindow.webContents.openDevTools();
    //
    // mainWindow.on('closed', () => {
    //     console.log("closed")
    // });
}

app.whenReady()
    .then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
