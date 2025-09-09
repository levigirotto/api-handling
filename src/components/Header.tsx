import LogoDark from "/logo-no-background-dark.png";
import LogoLight from "/logo-no-background-light.png";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const logo = theme === "dark" ? LogoDark : LogoLight;

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center bg-background w-full p-3">
      <div className="w-full flex justify-between items-center gap-1">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Website Logo" className="h-8 w-8" />
          <h2 className="text-lg font-semibold">API Cards</h2>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}