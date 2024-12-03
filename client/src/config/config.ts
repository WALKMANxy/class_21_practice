export const getApiUrl = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
    if (!apiUrl) {
      console.error("API URL is not defined inside config.ts.");
    }
  
    return apiUrl;
  };

  export const getBaseUrl = () => {
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
  
    if (!apiUrl) {
      console.error("API URL is not defined inside config.ts.");
    }
  
    return apiUrl;
  };