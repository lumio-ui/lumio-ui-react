import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/Button';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 p-2 bg-muted rounded-lg w-fit">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        className="p-2 h-8 w-8"
        onClick={() => setTheme('light')}
        title="Light Mode"
      >
        <Sun size={16} />
      </Button>
      
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        className="p-2 h-8 w-8"
        onClick={() => setTheme('dark')}
        title="Dark Mode"
      >
        <Moon size={16} />
      </Button>

      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        className="p-2 h-8 w-8"
        onClick={() => setTheme('system')}
        title="System Default"
      >
        <Monitor size={16} />
      </Button>
    </div>
  );
};