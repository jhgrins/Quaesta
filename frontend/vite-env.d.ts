/// <reference types="vite/client" />

/* eslint-disable no-unused-vars */
interface ImportMetaEnv {
    VITE_GRAPHQL_ENDPOINT: string;
    VITE_WEBSOCKET_ENDPOINT: string;
    VITE_GOOGLE_LOGIN_ENDPOINT: string;
    VITE_APPLE_LOGIN_ENDPOINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.mp4";
/* eslint-enable no-unused-vars */
