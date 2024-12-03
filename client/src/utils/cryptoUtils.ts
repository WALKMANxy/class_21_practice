
const STORAGE_KEY = "app_unique_identifier";

const generateUUID = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

export const getUniqueIdentifier = (): string => {
    try {
      let uniqueId = localStorage.getItem(STORAGE_KEY);
  
      if (!uniqueId) {
        // Use crypto.randomUUID() if available, otherwise fallback to a custom UUID generator
        uniqueId = crypto.randomUUID ? crypto.randomUUID() : generateUUID();
        localStorage.setItem(STORAGE_KEY, uniqueId);
      }
  
      return uniqueId;
    } catch (error) {
      console.warn(
        "LocalStorage or crypto.randomUUID is not available, generating a temporary UUID."
      );
      console.error(error);
  
      // If localStorage fails or crypto.randomUUID is unavailable, generate a UUID
      return crypto.randomUUID ? crypto.randomUUID() : generateUUID();
    }
  };
  