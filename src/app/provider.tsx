// src/app/provider.tsx
"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import '@/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}