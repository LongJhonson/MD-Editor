import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


contextBridge.exposeInMainWorld('electron', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  saveFileDialog: (data) => ipcRenderer.invoke('save-file-dialog', data),
  saveCurrentFile: (data) => ipcRenderer.invoke('save-current-file', data),
});

