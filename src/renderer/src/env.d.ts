/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RENDERER_VITE_REDIRECT_URL: string;
  readonly RENDERER_VITE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
