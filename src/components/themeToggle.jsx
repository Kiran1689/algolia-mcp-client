import React from 'react';
import { useTheme } from './useTheme';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu.jsx"; // Adjust path if different
import { Button } from './ui/button';
import { ChevronDown, Check, Sun, Moon, Laptop } from 'lucide-react'; 

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { label: 'Light', value: 'light', icon: <Sun className="w-4 h-4" /> },
    { label: 'Dark', value: 'dark', icon: <Moon className="w-4 h-4" /> },
    { label: 'Algolia', value: 'algolia', icon: <Laptop className="w-4 h-4" /> },
  ];

  const current = themes.find((t) => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs text-[var(--text-main)] dark:text-zinc-100 hover:text-white hover:bg-[var(--text-secondary)] rounded-lg border border-[var(--border)]"
        >
          <div className="flex items-center gap-2 mr-1">
            {current?.icon}
            <span className="hidden sm:inline">{current?.label}</span>
          </div>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-40 bg-gradient-to-b from-[var(--bg-main)] to-[var(--border)] border-[var(--border)]"
      >
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onSelect={() => setTheme(t.value)}
            className="flex items-center justify-between rounded-md text-[var(--text-main)] hover:bg-[var(--border)] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {t.icon}
              <span>{t.label}</span>
            </div>
            {theme === t.value && (
              <Check className="w-4 h-4 text-green-400" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
