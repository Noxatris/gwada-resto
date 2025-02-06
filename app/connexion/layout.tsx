// app/connexion/layout.tsx
import { ReactNode } from "react";

export default function ConnexionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      {children}
    </div>
  );
}