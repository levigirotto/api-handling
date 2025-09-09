import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <CiLight className="h-6 w-6"/>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked: boolean) =>
          setTheme(checked ? "dark" : "light")
        }
      />
      <CiDark className="h-6 w-6"/>
    </div>
  );
}