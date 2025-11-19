/**
 * Accessibility Utilities for BagBot Trading Platform
 * WCAG 2.1 contrast ratio checking and design QA tools
 */

/**
 * Color format types supported by the utilities
 */
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'css-var';

/**
 * WCAG compliance levels
 */
export interface WCAGResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AALarge: boolean;
  AAALarge: boolean;
}

/**
 * Convert hex color to RGB values
 */
const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

/**
 * Parse RGB string to RGB values
 */
const parseRgb = (rgb: string): [number, number, number] | null => {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  return match
    ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
    : null;
};

/**
 * Parse HSL string to RGB values
 */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };

  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
};

/**
 * Parse HSL string to RGB values
 */
const parseHsl = (hsl: string): [number, number, number] | null => {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return null;
  
  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = parseInt(match[3]);
  
  return hslToRgb(h, s, l);
};

/**
 * Get computed style color value from CSS variable
 */
const getCssVarValue = (cssVar: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const varName = cssVar.startsWith('--') ? cssVar : `--${cssVar}`;
  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(varName).trim();
};

/**
 * Parse any color format to RGB values
 */
const parseColor = (color: string): [number, number, number] | null => {
  // Remove whitespace
  const cleanColor = color.trim();
  
  // Handle CSS variables
  if (cleanColor.startsWith('var(') || cleanColor.startsWith('--')) {
    const cssVarMatch = cleanColor.match(/var\((--[^)]+)\)/) || cleanColor.match(/(--[^)]+)/);
    if (cssVarMatch) {
      const resolvedValue = getCssVarValue(cssVarMatch[1]);
      if (resolvedValue) {
        return parseColor(resolvedValue);
      }
    }
    return null;
  }
  
  // Handle hex colors
  if (cleanColor.startsWith('#')) {
    return hexToRgb(cleanColor);
  }
  
  // Handle rgb() colors
  if (cleanColor.startsWith('rgb(')) {
    return parseRgb(cleanColor);
  }
  
  // Handle hsl() colors
  if (cleanColor.startsWith('hsl(')) {
    return parseHsl(cleanColor);
  }
  
  // Handle named colors (basic set)
  const namedColors: { [key: string]: [number, number, number] } = {
    white: [255, 255, 255],
    black: [0, 0, 0],
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    purple: [128, 0, 128],
    gray: [128, 128, 128],
    grey: [128, 128, 128],
  };
  
  return namedColors[cleanColor.toLowerCase()] || null;
};

/**
 * Calculate relative luminance of an RGB color
 * Based on WCAG 2.1 formula
 */
const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1:1 (no contrast) to 21:1 (max contrast)
 */
export const getContrastRatio = (
  color1: string,
  color2: string
): number | null => {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);
  
  if (!rgb1 || !rgb2) {
    console.warn(`Accessibility: Unable to parse colors "${color1}" or "${color2}"`);
    return null;
  }
  
  const lum1 = getRelativeLuminance(...rgb1);
  const lum2 = getRelativeLuminance(...rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check WCAG contrast compliance for foreground/background color combination
 * @param fg Foreground color (text color)
 * @param bg Background color
 * @returns WCAG compliance results with AA/AAA pass booleans
 */
export const checkContrast = (fg: string, bg: string): WCAGResult | null => {
  const ratio = getContrastRatio(fg, bg);
  
  if (ratio === null) {
    return null;
  }
  
  return {
    ratio: Math.round(ratio * 100) / 100, // Round to 2 decimal places
    AA: ratio >= 4.5,           // WCAG AA normal text
    AAA: ratio >= 7,            // WCAG AAA normal text
    AALarge: ratio >= 3,        // WCAG AA large text (18pt+ or 14pt+ bold)
    AAALarge: ratio >= 4.5,     // WCAG AAA large text
  };
};

/**
 * Validate color contrast and warn in console if it fails WCAG standards
 * @param fg Foreground color
 * @param bg Background color
 * @param context Optional context for better error messages
 * @param level Minimum required compliance level
 */
export const validateContrast = (
  fg: string,
  bg: string,
  context?: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const result = checkContrast(fg, bg);
  
  if (!result) {
    console.error(
      `🚨 Accessibility: Failed to validate contrast${context ? ` for ${context}` : ''} - unable to parse colors`,
      { foreground: fg, background: bg }
    );
    return false;
  }
  
  const passed = level === 'AA' ? result.AA : result.AAA;
  const contextStr = context ? ` for ${context}` : '';
  
  if (!passed) {
    console.warn(
      `⚠️ Accessibility: WCAG ${level} contrast failure${contextStr}`,
      {
        foreground: fg,
        background: bg,
        ratio: `${result.ratio}:1`,
        required: level === 'AA' ? '4.5:1' : '7:1',
        compliance: result,
      }
    );
  } else {
    console.log(
      `✅ Accessibility: WCAG ${level} contrast pass${contextStr}`,
      { ratio: `${result.ratio}:1`, compliance: result }
    );
  }
  
  return passed;
};

/**
 * Validate large text contrast (18pt+ or 14pt+ bold)
 */
export const validateLargeTextContrast = (
  fg: string,
  bg: string,
  context?: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const result = checkContrast(fg, bg);
  
  if (!result) {
    console.error(
      `🚨 Accessibility: Failed to validate large text contrast${context ? ` for ${context}` : ''} - unable to parse colors`
    );
    return false;
  }
  
  const passed = level === 'AA' ? result.AALarge : result.AAALarge;
  const contextStr = context ? ` for ${context}` : '';
  
  if (!passed) {
    console.warn(
      `⚠️ Accessibility: WCAG ${level} large text contrast failure${contextStr}`,
      {
        foreground: fg,
        background: bg,
        ratio: `${result.ratio}:1`,
        required: level === 'AA' ? '3:1' : '4.5:1',
        compliance: result,
      }
    );
  }
  
  return passed;
};

/**
 * Batch validate multiple color combinations
 * Useful for design system QA
 */
export interface ColorCombination {
  name: string;
  foreground: string;
  background: string;
  isLargeText?: boolean;
  requiredLevel?: 'AA' | 'AAA';
}

export const batchValidateContrast = (
  combinations: ColorCombination[]
): { passed: number; failed: number; results: Array<ColorCombination & { result: WCAGResult | null; passed: boolean }> } => {
  console.group('🎨 Design System Contrast Validation');
  
  let passed = 0;
  let failed = 0;
  
  const results = combinations.map((combo) => {
    const result = checkContrast(combo.foreground, combo.background);
    const level = combo.requiredLevel || 'AA';
    
    let testPassed = false;
    if (result) {
      if (combo.isLargeText) {
        testPassed = level === 'AA' ? result.AALarge : result.AAALarge;
      } else {
        testPassed = level === 'AA' ? result.AA : result.AAA;
      }
    }
    
    if (testPassed) {
      passed++;
    } else {
      failed++;
      console.warn(`❌ ${combo.name}: ${result?.ratio.toFixed(2) || 'N/A'}:1 ratio`);
    }
    
    return { ...combo, result, passed: testPassed };
  });
  
  console.log(`✅ Passed: ${passed}, ❌ Failed: ${failed}`);
  console.groupEnd();
  
  return { passed, failed, results };
};

/**
 * Quick validation for common BagBot design system colors
 * Run this in development to check your color combinations
 */
export const validateBagBotColors = (): void => {
  const combinations: ColorCombination[] = [
    // Primary combinations
    { name: 'Primary Text on Primary-700', foreground: 'white', background: 'var(--color-primary-700)' },
    { name: 'Primary-700 on White', foreground: 'var(--color-primary-700)', background: 'white' },
    
    // Accent combinations
    { name: 'Black Text on Accent', foreground: 'black', background: 'var(--color-accent)' },
    { name: 'Accent on White', foreground: 'var(--color-accent)', background: 'white' },
    
    // Status colors
    { name: 'White on Success', foreground: 'white', background: 'var(--color-success)' },
    { name: 'White on Danger', foreground: 'white', background: 'var(--color-danger)' },
    { name: 'White on Warning', foreground: 'white', background: 'var(--color-warning)' },
    { name: 'Black on Warning', foreground: 'black', background: 'var(--color-warning)' },
    { name: 'White on Info', foreground: 'white', background: 'var(--color-info)' },
    
    // Surface combinations
    { name: 'Main Text on Surface', foreground: 'var(--color-main)', background: 'var(--color-surface)' },
    { name: 'Muted Text on Surface', foreground: 'var(--color-muted)', background: 'var(--color-surface)' },
  ];
  
  batchValidateContrast(combinations);
};

/**
 * Development helper to check all StatusTile combinations
 */
export const validateStatusTileContrast = (): void => {
  console.group('🚦 StatusTile Contrast Validation');
  
  const statusCombinations: ColorCombination[] = [
    { name: 'Healthy Status', foreground: 'white', background: 'var(--color-primary-700)' },
    { name: 'Degraded Status', foreground: 'black', background: 'var(--color-accent)' },
    { name: 'Down Status', foreground: 'white', background: 'var(--color-danger)' },
    { name: 'Maintenance Status', foreground: 'white', background: 'var(--color-info)' },
  ];
  
  batchValidateContrast(statusCombinations);
  console.groupEnd();
};