'use client';

import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { configureAmplify } from '@/lib/amplify-config';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configure Amplify on client side
    configureAmplify();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
