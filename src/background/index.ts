import { ipcMain } from 'electron'
import { syncWithZenn } from './zenn'
export function initIpcMain () {
  syncWithZenn(ipcMain)
}
