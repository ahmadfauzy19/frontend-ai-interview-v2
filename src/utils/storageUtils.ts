import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_STORAGE_KEY;

export const storageService = {
  // Menyimpan data (Enkripsi)
  set: (key: string, value: any) => {
    const jsonValue = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(jsonValue, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  },

  // Mengambil data (Dekripsi)
  get: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Gagal mendeskripsi data storage', error);
      return null;
    }
  },

  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
