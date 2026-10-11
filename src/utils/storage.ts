import { DEFAULT_PORTFOLIO } from '../data/defaultPortfolio';
import { PortfolioData } from '../types/portfolio';

const DB_NAME = 'aadhipradhap_portfolio_db';
const DB_VERSION = 1;
const PHOTO_KEY = 'profile_photo';
const RESUME_KEY = 'custom_resume';
const CONTENT_KEY = 'portfolio_content';
const LOCALSTORAGE_CONTENT_KEY = 'ap_portfolio_data';
const LOCALSTORAGE_PHOTO_KEY = 'ap_portfolio_photo';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('media')) {
        db.createObjectStore('media');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ----------------- Profile Photo Persistence -----------------

export async function getProfilePhoto(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('media', 'readonly');
      const store = tx.objectStore('media');
      const req = store.get(PHOTO_KEY);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result as string);
        } else {
          // Check fallback in localStorage
          const local = localStorage.getItem(LOCALSTORAGE_PHOTO_KEY);
          resolve(local);
        }
      };
      req.onerror = () => {
        resolve(localStorage.getItem(LOCALSTORAGE_PHOTO_KEY));
      };
    });
  } catch {
    return localStorage.getItem(LOCALSTORAGE_PHOTO_KEY);
  }
}

export async function saveProfilePhoto(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('media', 'readwrite');
      const store = tx.objectStore('media');
      const req = store.put(dataUrl, PHOTO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    // Also save light copy or indicator to localStorage
    try {
      if (dataUrl.length < 500000) {
        localStorage.setItem(LOCALSTORAGE_PHOTO_KEY, dataUrl);
      }
    } catch {
      // quota exceeded in localStorage is safe since IndexedDB has it
    }
  } catch {
    try {
      localStorage.setItem(LOCALSTORAGE_PHOTO_KEY, dataUrl);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }
}

export async function removeProfilePhoto(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('media', 'readwrite');
      const store = tx.objectStore('media');
      const req = store.delete(PHOTO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB delete failed:', e);
  }
  localStorage.removeItem(LOCALSTORAGE_PHOTO_KEY);
}

// ----------------- Custom Resume PDF Persistence -----------------

export interface StoredResume {
  name: string;
  type: string;
  size: number;
  data: Blob;
  updatedAt: string;
}

export async function getCustomResume(): Promise<StoredResume | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('media', 'readonly');
      const store = tx.objectStore('media');
      const req = store.get(RESUME_KEY);
      req.onsuccess = () => resolve((req.result as StoredResume) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveCustomResume(file: File): Promise<{ fileName: string }> {
  const db = await openDB();
  const storedResume: StoredResume = {
    name: file.name,
    type: file.type || 'application/pdf',
    size: file.size,
    data: file,
    updatedAt: new Date().toISOString(),
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction('media', 'readwrite');
    const store = tx.objectStore('media');
    const req = store.put(storedResume, RESUME_KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  return { fileName: file.name };
}

export async function removeCustomResume(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('media', 'readwrite');
      const store = tx.objectStore('media');
      const req = store.delete(RESUME_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to remove custom resume:', e);
  }
}

// ----------------- Portfolio Data Persistence -----------------

export async function loadPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await openDB();
    const stored = await new Promise<PortfolioData | null>((resolve) => {
      const tx = db.transaction('settings', 'readonly');
      const store = tx.objectStore('settings');
      const req = store.get(CONTENT_KEY);
      req.onsuccess = () => resolve((req.result as PortfolioData) || null);
      req.onerror = () => resolve(null);
    });
    if (stored) {
      return { ...DEFAULT_PORTFOLIO, ...stored };
    }
  } catch (e) {
    console.warn('IndexedDB loadPortfolioData error, falling back to localStorage:', e);
  }

  // Fallback to localStorage
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_CONTENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PORTFOLIO, ...parsed };
    }
  } catch {
    // Ignore parse error
  }

  return DEFAULT_PORTFOLIO;
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('settings', 'readwrite');
      const store = tx.objectStore('settings');
      const req = store.put(data, CONTENT_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB savePortfolioData error:', e);
  }

  try {
    localStorage.setItem(LOCALSTORAGE_CONTENT_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

export async function resetPortfolioData(): Promise<PortfolioData> {
  await savePortfolioData(DEFAULT_PORTFOLIO);
  await removeProfilePhoto();
  await removeCustomResume();
  return DEFAULT_PORTFOLIO;
}
