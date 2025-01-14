'use client';
import { useTheme } from 'next-themes';
import { TbSunFilled, TbMoonFilled } from 'react-icons/tb';

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleThemeChange() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button className="flex self-end" onClick={handleThemeChange}>
      <TbMoonFilled
        size={30}
        className={`cursor-pointer themeSpinner ${
          resolvedTheme !== 'dark' ? 'visible animate-themeSpinner' : 'hidden'
        }`}
      />
      <TbSunFilled
        size={30}
        className={`cursor-pointer themeSpinner ${
          resolvedTheme === 'dark' ? 'visible animate-themeSpinner' : 'hidden'
        }`}
      />
    </button>
  );
}
