/**
 * PaletteShowcase Component for BagBot Trading Platform
 * Visual reference for designers to see all theme colors and their CSS variables
 */

import React from 'react';
import { useTheme } from '../utils/theme';

/**
 * Color swatch data with CSS variable names and hex values
 */
const colorSwatches = [
  // Primary Colors
  {
    category: 'Primary',
    colors: [
      { name: 'Primary Default', variable: '--color-primary', hex: '#A63F45', cssClass: 'bg-primary' },
      { name: 'Primary 700', variable: '--color-primary-700', hex: '#8B2E2E', cssClass: 'bg-primary-700' },
      { name: 'Primary 200', variable: '--color-primary-200', hex: '#E8B3B4', cssClass: 'bg-primary-200' },
    ]
  },
  // Accent Colors
  {
    category: 'Accent',
    colors: [
      { name: 'Accent Default', variable: '--color-accent', hex: '#FFC107', cssClass: 'bg-accent' },
      { name: 'Accent 700', variable: '--color-accent-700', hex: '#E6A800', cssClass: 'bg-accent-700' },
    ]
  },
  // Base Colors
  {
    category: 'Base',
    colors: [
      { name: 'Black', variable: '--color-black', hex: '#0A0A0A', cssClass: 'bg-black' },
      { name: 'Text', variable: '--color-text', hex: '#111214', cssClass: 'bg-[var(--color-text)]' },
      { name: 'Surface', variable: '--color-surface', hex: '#F5F6F7', cssClass: 'bg-surface' },
      { name: 'White', variable: '--color-white', hex: '#FFFFFF', cssClass: 'bg-white border' },
    ]
  },
  // Semantic Colors
  {
    category: 'Semantic',
    colors: [
      { name: 'Success', variable: '--color-success', hex: '#22C55E', cssClass: 'bg-success' },
      { name: 'Danger', variable: '--color-danger', hex: '#EF4444', cssClass: 'bg-danger' },
      { name: 'Warning', variable: '--color-warning', hex: '#F59E0B', cssClass: 'bg-warning' },
      { name: 'Info', variable: '--color-info', hex: '#3B82F6', cssClass: 'bg-info' },
    ]
  }
];

/**
 * Individual color swatch component
 */
interface ColorSwatchProps {
  name: string;
  variable: string;
  hex: string;
  cssClass: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, variable, hex, cssClass }) => {
  /**
   * Copy CSS variable to clipboard
   */
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <div className="group relative">
      {/* Color Square */}
      <div
        className={`
          w-16 h-16 rounded-lg shadow-custom-sm
          cursor-pointer transition-all duration-200
          hover:shadow-custom-md hover:scale-105
          ${cssClass}
        `}
        onClick={() => copyToClipboard(`var(${variable})`)}
        title={`Click to copy: var(${variable})`}
      />
      
      {/* Color Info */}
      <div className="mt-2 space-y-1">
        <h4 className="text-sm font-medium text-main truncate">
          {name}
        </h4>
        <div className="space-y-0.5">
          <code 
            className="block text-xs text-muted font-mono cursor-pointer hover:text-main transition-colors"
            onClick={() => copyToClipboard(`var(${variable})`)}
            title="Click to copy CSS variable"
          >
            var({variable})
          </code>
          <code 
            className="block text-xs text-muted font-mono cursor-pointer hover:text-main transition-colors"
            onClick={() => copyToClipboard(hex)}
            title="Click to copy hex value"
          >
            {hex}
          </code>
        </div>
      </div>

      {/* Hover tooltip */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Click to copy
        </div>
      </div>
    </div>
  );
};

/**
 * Color category section component
 */
interface CategorySectionProps {
  category: string;
  colors: Array<{
    name: string;
    variable: string;
    hex: string;
    cssClass: string;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, colors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-main border-b border-main pb-2">
        {category} Colors
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {colors.map((color) => (
          <ColorSwatch
            key={color.variable}
            name={color.name}
            variable={color.variable}
            hex={color.hex}
            cssClass={color.cssClass}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Main palette showcase component
 */
const PaletteShowcase: React.FC = () => {
  const [theme] = useTheme();

  return (
    <div className="p-6 bg-card rounded-xl border border-main">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          BagBot Color Palette
        </h2>
        <p className="text-muted">
          Design system color reference for the trading platform. Click any color to copy its CSS variable.
        </p>
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-sm text-muted">Current theme:</span>
          <span className="px-2 py-1 bg-surface rounded text-sm font-medium text-main capitalize">
            {theme}
          </span>
        </div>
      </div>

      {/* Color Categories */}
      <div className="space-y-8">
        {colorSwatches.map((category) => (
          <CategorySection
            key={category.category}
            category={category.category}
            colors={category.colors}
          />
        ))}
      </div>

      {/* Usage Guide */}
      <div className="mt-8 p-4 bg-surface rounded-lg border border-main">
        <h4 className="font-semibold text-main mb-2">Usage Guide</h4>
        <div className="space-y-2 text-sm text-muted">
          <p>• Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">var(--color-primary)</code> in CSS for dynamic theme colors</p>
          <p>• Apply Tailwind classes like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.bg-primary</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.text-primary</code> in components</p>
          <p>• Success/Danger colors are ideal for trading P&L displays</p>
          <p>• All colors automatically adapt to light/dark theme changes</p>
        </div>
      </div>
    </div>
  );
};

export default PaletteShowcase;