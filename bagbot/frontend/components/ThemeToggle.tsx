/**
 * ThemeToggle Component for Bagbot Trading Platform
 * Provides accessible theme switching with smooth animations
 */

import React from 'react';
import { useTheme, toggleTheme, isDarkTheme } from '../utils/theme';

/**
 * Theme toggle button component with sun/moon icons and smooth animations
 * @returns JSX.Element - Accessible theme toggle button
 */
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useTheme();
  const isPressed = isDarkTheme(theme);

  /**
   * Handle theme toggle click
   */
  const handleToggle = (): void => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
  };

  /**
   * Handle keyboard interaction
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-pressed={isPressed}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-12 rounded-full
        bg-surface hover:bg-gray-100 dark:hover:bg-gray-700
        border border-main
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
        hover:scale-105 active:scale-95
        shadow-custom-sm hover:shadow-custom-md
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Background overlay for active state */}
      <div
        className={`
          absolute inset-0 rounded-full transition-opacity duration-300
          ${isPressed ? 'bg-accent opacity-10' : 'opacity-0'}
        `}
      />

      {/* Icon container with rotation animation */}
      <div
        className={`
          relative flex items-center justify-center
          w-6 h-6
          transform transition-transform duration-500 ease-in-out
          ${isPressed ? 'rotate-180' : 'rotate-0'}
        `}
      >
        {/* Sun Icon (Light Mode) */}
        <svg
          className={`
            absolute w-6 h-6
            transition-all duration-300 ease-in-out
            ${theme === 'light' 
              ? 'opacity-100 scale-100 text-yellow-500' 
              : 'opacity-0 scale-75 text-gray-400'
            }
          `}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon (Dark Mode) */}
        <svg
          className={`
            absolute w-6 h-6
            transition-all duration-300 ease-in-out
            ${theme === 'dark' 
              ? 'opacity-100 scale-100 text-yellow-300' 
              : 'opacity-0 scale-75 text-gray-400'
            }
          `}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      </div>

      {/* Active indicator ring */}
      <div
        className={`
          absolute inset-0 rounded-full border-2
          transition-all duration-300 ease-in-out
          ${isPressed 
            ? 'border-yellow-400 opacity-100 scale-110' 
            : 'border-transparent opacity-0 scale-100'
          }
        `}
      />

      {/* Ripple effect on click */}
      <div
        className={`
          absolute inset-0 rounded-full
          animate-ping opacity-0
          bg-accent
          ${isPressed ? 'animate-none' : ''}
        `}
        style={{
          animationDuration: '0.6s',
          animationIterationCount: '1',
        }}
      />
    </button>
  );
};

export default ThemeToggle;