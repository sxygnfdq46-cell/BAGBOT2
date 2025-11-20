# Dashboard Components

## StatsCard

An enhanced, animated statistics card component with premium visual effects, perfect for displaying trading metrics and real-time data.

### Features

- 🎬 **Animated Number Transitions**: Smooth spring-physics based number animations using Framer Motion
- 🎨 **Color-Coded Indicators**: Dynamic gain/loss micro-animations with color-based feedback
- ✨ **Pulsing LIVE Tags**: Soft glowing animation behind real-time indicators
- 🎯 **Lucide Icons**: Beautiful, semantic icons for each stat type
- 📊 **Progress Bars**: Animated gradient progress indicators
- 🖱️ **Interactive Hover Effects**: Scale transforms and icon rotation
- 📱 **Fully Responsive**: Adapts seamlessly across all device sizes

### Usage

```tsx
import StatsCard from '../components/Dashboard/StatsCard';

// Basic usage
<StatsCard
  title="Total Trades"
  value={127}
  icon="trades"
  colorScheme="emerald"
/>

// With change indicator
<StatsCard
  title="Profit/Loss"
  value={12.5}
  change={5.2}
  changeLabel="24h change"
  icon="profit"
  colorScheme="emerald"
  isPercentage={true}
  showLiveTag={true}
/>

// With progress bar
<StatsCard
  title="Win Rate"
  value={68}
  change={3.8}
  icon="winrate"
  colorScheme="sky"
  isPercentage={true}
  showProgressBar={true}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | The label displayed at the top of the card |
| `value` | `number \| string` | **required** | The main metric value to display |
| `change` | `number` | `undefined` | Percentage change value (shows trend indicator) |
| `changeLabel` | `string` | `'vs last week'` | Label for the change indicator |
| `icon` | `'trades' \| 'profit' \| 'winrate' \| 'positions'` | `'trades'` | Icon type to display |
| `showLiveTag` | `boolean` | `false` | Show animated LIVE tag with pulsing glow |
| `isPercentage` | `boolean` | `false` | Append % symbol to value |
| `prefix` | `string` | `''` | Prefix for the value (e.g., '$', '€') |
| `colorScheme` | `'emerald' \| 'amber' \| 'sky' \| 'violet' \| 'rose'` | `'emerald'` | Color theme for the card |
| `showProgressBar` | `boolean` | `false` | Display animated progress bar below value |
| `className` | `string` | `''` | Additional CSS classes |

### Icon Types

- **`trades`**: BarChart3 icon - for trading volume and count metrics
- **`profit`**: DollarSign icon - for profit/loss and financial metrics
- **`winrate`**: Target icon - for accuracy and success rates
- **`positions`**: Activity icon - for active positions and status

### Color Schemes

Each color scheme provides consistent theming across:
- Border colors (normal + hover states)
- Icon background and text colors
- Value text colors
- Glow effects

Available schemes: `emerald` (default), `amber`, `sky`, `violet`, `rose`

### Animation Details

#### Number Animations
- Uses `react-spring` physics with damping: 30, stiffness: 100
- Smooth transitions when values update
- Maintains 2 decimal precision for financial data

#### LIVE Tag Glow
- 2-second infinite pulse cycle
- Box shadow: 0 → 20px emerald glow → 0
- Synchronized with small indicator dot

#### Trend Indicators
- TrendingUp/Down icons based on change value
- Vertical bounce animation (±2px)
- 1.5s infinite cycle with easeInOut

#### Hover Effects
- Card scale: 1.0 → 1.02 (0.2s duration)
- Icon rotation: 0° → -10° → 10° → -10° → 0° (0.5s)
- Icon scale: 1.0 → 1.1

#### Progress Bars
- Width animation from 0 → value% over 1 second
- 0.3s delay for staggered effect
- Gradient fill with color scheme

### Accessibility

- Semantic HTML structure
- Proper ARIA labels on interactive elements
- Keyboard navigation support via `cursor-pointer`
- Touch-optimized tap targets (min 44px)
- Screen reader friendly animations

### Performance

- Optimized re-renders with React memoization
- GPU-accelerated transforms (scale, rotate)
- Debounced spring animations
- Lazy icon loading via Lucide React

### Examples

#### Trading Dashboard Metrics
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatsCard
    title="Total Trades"
    value={tradingStats.totalTrades}
    change={12.5}
    icon="trades"
    colorScheme="emerald"
  />
  <StatsCard
    title="Profit/Loss"
    value={tradingStats.profitLoss}
    change={tradingStats.profitLoss >= 0 ? 5.2 : -2.3}
    icon="profit"
    colorScheme={tradingStats.profitLoss >= 0 ? 'emerald' : 'rose'}
    isPercentage={true}
    showLiveTag={true}
  />
  <StatsCard
    title="Win Rate"
    value={tradingStats.winRate}
    change={3.8}
    icon="winrate"
    colorScheme="sky"
    isPercentage={true}
    showProgressBar={true}
  />
  <StatsCard
    title="Active Positions"
    value={tradingStats.activePositions}
    icon="positions"
    colorScheme="violet"
    showLiveTag={tradingStats.activePositions > 0}
  />
</div>
```

#### Financial Metrics
```tsx
<StatsCard
  title="Account Balance"
  value={5432.87}
  change={8.3}
  changeLabel="this month"
  icon="profit"
  prefix="$"
  colorScheme="emerald"
  showLiveTag={true}
/>
```

### Dependencies

- `framer-motion@^12.23.24` - Animation library
- `lucide-react@^0.554.0` - Icon library
- `react@^18.2.0` - UI framework

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### Related Components

- `GlassCard` - Base glass morphism container
- `StatusTile` - System status indicator
- `MetricsChart` - Time-series data visualization

### Best Practices

1. **Consistent Color Schemes**: Use the same color for related metrics
2. **Live Tags**: Reserve for truly real-time data that updates frequently
3. **Change Labels**: Provide context (e.g., "vs last week", "24h change")
4. **Progress Bars**: Best for percentage-based metrics (0-100%)
5. **Responsive Grids**: Use 2-column on mobile, 4-column on desktop

### Troubleshooting

**Q: Numbers aren't animating**
- Ensure value is a `number` type, not a string
- Check that framer-motion is properly installed

**Q: LIVE tag not glowing**
- Verify `showLiveTag={true}` is set
- Check for conflicting CSS that overrides box-shadow

**Q: Icons not displaying**
- Confirm lucide-react is installed
- Verify icon prop matches available types

**Q: Progress bar wrong color**
- Use `showProgressBar={true}` prop
- Ensure colorScheme matches desired gradient

### Future Enhancements

- [ ] Sparkline charts integration
- [ ] Custom icon support via props
- [ ] Click handlers for drill-down navigation
- [ ] Loading skeleton states
- [ ] Tooltip on hover for additional context
- [ ] Export to image functionality
- [ ] Dark/light theme variants
