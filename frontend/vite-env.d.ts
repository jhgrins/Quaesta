/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_GRAPHQL_ENDPOINT: string;
    VITE_WEBSOCKET_ENDPOINT: string;
    VITE_GOOGLE_LOGIN_ENDPOINT: string;
    VITE_APPLE_LOGIN_ENDPOINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
