// app/connexion/layout.tsx
import { ReactNode } from "react";

export default function ConnexionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex justify-center bg-white">
      {children}
    </div>
  );
}