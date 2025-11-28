import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white/90 grid place-items-center px-4 py-12">
      {children}
    </div>
  );
}
