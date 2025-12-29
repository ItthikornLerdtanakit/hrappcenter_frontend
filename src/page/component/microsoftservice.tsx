import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_CLIENT_ID, // จาก Azure App Registration
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`, // หรือ tenant ID ของบริษัท
        redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URL, // URL ของ React app
    }
};

export const loginRequest = {
    scopes: [import.meta.env.VITE_AZURE_SCOPES], // 👈 scope ที่ต้องการ
};

export const msalInstance = new PublicClientApplication(msalConfig);