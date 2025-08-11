/// <reference types="vite/client" />

declare module '@react-oauth/google' {
  export const GoogleOAuthProvider: React.ComponentType<{ clientId: string; children?: React.ReactNode }>;
  export const GoogleLogin: React.ComponentType<{
    onSuccess: (credentialResponse: { credential?: string | null }) => void;
    onError?: () => void;
    useOneTap?: boolean;
  }>;
}
/// <reference types="vite/client" />
