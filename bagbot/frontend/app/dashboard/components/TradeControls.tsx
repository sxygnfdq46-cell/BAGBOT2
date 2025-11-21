'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, DollarSign, Shield, Target, Zap, CheckCircle } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  riskPct: number;
  stopLoss: number;
  takeProfit: number;
}

interface Account {
  balance: number;
  currency: string;
}

interface TradeControlsProps {
  account: Account;
  presets: Preset[];
  onExecute: (trade: any) => void;
}

export default function TradeControls({ account, presets, onExecute }: TradeControlsProps) {
  // Form state
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [stake, setStake] = useState<number>(100);
  const [riskPct, setRiskPct] = useState<number>(2);
  const [method, setMethod] = useState('percentage');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(2);
  const [takeProfit, setTakeProfit] = useState<number>(4);
  const [leverage, setLeverage] = useState<number>(1);
  const [leverageEnabled, setLeverageEnabled] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [paperTrade, setPaperTrade] = useState(true);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Computed values
  const [positionSize, setPositionSize] = useState<number>(0);
  const [estimatedCommission, setEstimatedCommission] = useState<number>(0);
  const [riskAmount, setRiskAmount] = useState<number>(0);

  // Symbols dropdown options
  const symbols = [
    'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 
    'MATIC/USDT', 'AVAX/USDT', 'DOT/USDT', 'LINK/USDT'
  ];

  const methods = [
    { value: 'percentage', label: 'Risk Percentage' },
    { value: 'fixed', label: 'Fixed Amount' },
    { value: 'kelly', label: 'Kelly Criterion' }
  ];

  // Apply preset
  useEffect(() => {
    if (selectedPreset) {
      const preset = presets.find(p => p.id === selectedPreset);
      if (preset) {
        setRiskPct(preset.riskPct);
        setStopLoss(preset.stopLoss);
        setTakeProfit(preset.takeProfit);
      }
    }
  }, [selectedPreset, presets]);

  // Calculate preview values
  useEffect(() => {
    // Position size calculation based on risk percentage
    const riskAmountCalc = (account.balance * riskPct) / 100;
    setRiskAmount(riskAmountCalc);

    // Position size = stake amount * leverage
    const posSize = stake * (leverageEnabled ? leverage : 1);
    setPositionSize(posSize);

    // Commission estimate (0.1% maker/taker fee)
    const commission = posSize * 0.001;
    setEstimatedCommission(commission);
  }, [stake, riskPct, leverage, leverageEnabled, account.balance]);

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!symbol) {
      newErrors.symbol = 'Symbol is required';
    }

    if (stake <= 0) {
      newErrors.stake = 'Stake must be greater than 0';
    }

    if (stake > account.balance) {
      newErrors.stake = 'Insufficient balance';
    }

    if (riskPct <= 0 || riskPct > 100) {
      newErrors.riskPct = 'Risk must be between 0 and 100';
    }

    if (orderType === 'limit' && limitPrice <= 0) {
      newErrors.limitPrice = 'Limit price must be greater than 0';
    }

    if (stopLoss <= 0) {
      newErrors.stopLoss = 'Stop loss must be greater than 0';
    }

    if (takeProfit <= 0) {
      newErrors.takeProfit = 'Take profit must be greater than 0';
    }

    if (leverageEnabled && (leverage < 1 || leverage > 100)) {
      newErrors.leverage = 'Leverage must be between 1 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    const payload = {
      symbol,
      stake,
      riskPct,
      method,
      orderType,
      limitPrice: orderType === 'limit' ? limitPrice : null,
      stopLoss,
      takeProfit,
      leverage: leverageEnabled ? leverage : 1,
      paperTrade,
      positionSize,
      estimatedCommission,
      riskAmount
    };

    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Trade execution failed');
      }

      const result = await response.json();
      
      setSubmitSuccess(true);
      onExecute(result);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to execute trade. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-[#7C2F39]/10 to-black border border-[#7C2F39]/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#F9D949]/20">
            <TrendingUp className="w-6 h-6 text-[#F9D949]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#FFFBE7]">Trade Controls</h2>
            <p className="text-[#FFFBE7]/60 text-sm">Configure and execute trades</p>
          </div>
        </div>

        {/* Paper Trade Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#FFFBE7]/60 font-semibold">Paper Trade</span>
          <button
            onClick={() => setPaperTrade(!paperTrade)}
            className={`relative w-14 h-7 rounded-full transition-all ${
              paperTrade ? 'bg-[#4ADE80]' : 'bg-[#7C2F39]'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                paperTrade ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Preset Selector */}
        {presets.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
              Quick Preset
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
            >
              <option value="">Select a preset...</option>
              {presets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Symbol Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
            Trading Pair
          </label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
          {errors.symbol && (
            <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.symbol}
            </p>
          )}
        </div>

        {/* Stake Amount */}
        <div>
          <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
            Stake Amount ({account.currency})
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFFBE7]/40" />
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              min="0"
              step="0.01"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
            />
          </div>
          <p className="mt-1 text-xs text-[#FFFBE7]/50">
            Available: {account.balance.toFixed(2)} {account.currency}
          </p>
          {errors.stake && (
            <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.stake}
            </p>
          )}
        </div>

        {/* Risk Percentage Slider */}
        <div>
          <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
            Risk Percentage: <span className="text-[#F9D949]">{riskPct}%</span>
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="range"
              value={riskPct}
              onChange={(e) => setRiskPct(Number(e.target.value))}
              min="0.1"
              max="10"
              step="0.1"
              className="flex-1 h-2 rounded-full bg-black/50 appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #7C2F39 0%, #F9D949 ${riskPct * 10}%, rgba(124, 47, 57, 0.3) ${riskPct * 10}%)`,
              }}
            />
            <input
              type="number"
              value={riskPct}
              onChange={(e) => setRiskPct(Number(e.target.value))}
              min="0.1"
              max="100"
              step="0.1"
              className="w-20 px-3 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] text-center focus:border-[#F9D949] focus:outline-none"
            />
          </div>
          {errors.riskPct && (
            <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.riskPct}
            </p>
          )}
        </div>

        {/* Method Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
            Position Sizing Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
          >
            {methods.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
            Order Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setOrderType('market')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                orderType === 'market'
                  ? 'bg-[#7C2F39] border-2 border-[#F9D949] text-[#FFFBE7]'
                  : 'bg-black/50 border-2 border-[#7C2F39]/30 text-[#FFFBE7]/60 hover:border-[#F9D949]/50'
              }`}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderType('limit')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                orderType === 'limit'
                  ? 'bg-[#7C2F39] border-2 border-[#F9D949] text-[#FFFBE7]'
                  : 'bg-black/50 border-2 border-[#7C2F39]/30 text-[#FFFBE7]/60 hover:border-[#F9D949]/50'
              }`}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Limit Price (conditional) */}
        {orderType === 'limit' && (
          <div>
            <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
              Limit Price
            </label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(Number(e.target.value))}
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
            />
            {errors.limitPrice && (
              <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.limitPrice}
              </p>
            )}
          </div>
        )}

        {/* Stop Loss & Take Profit */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
              Stop Loss (%)
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F87171]/60" />
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                min="0"
                step="0.1"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
              />
            </div>
            {errors.stopLoss && (
              <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.stopLoss}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#FFFBE7] mb-2">
              Take Profit (%)
            </label>
            <div className="relative">
              <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ADE80]/60" />
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                min="0"
                step="0.1"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
              />
            </div>
            {errors.takeProfit && (
              <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.takeProfit}
              </p>
            )}
          </div>
        </div>

        {/* Leverage Toggle & Input */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-[#FFFBE7]">
              Enable Leverage
            </label>
            <button
              type="button"
              onClick={() => setLeverageEnabled(!leverageEnabled)}
              className={`relative w-14 h-7 rounded-full transition-all ${
                leverageEnabled ? 'bg-[#F9D949]' : 'bg-[#7C2F39]'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                  leverageEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
          {leverageEnabled && (
            <div>
              <div className="relative">
                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F9D949]" />
                <input
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  min="1"
                  max="100"
                  step="1"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] focus:border-[#F9D949] focus:outline-none transition-all"
                />
              </div>
              <p className="mt-1 text-xs text-[#F9D949]">
                ⚠️ Higher leverage increases both potential profit and risk
              </p>
              {errors.leverage && (
                <p className="mt-2 text-sm text-[#F87171] flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.leverage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className="p-6 rounded-xl bg-[#7C2F39]/20 border border-[#7C2F39]/40">
          <h3 className="text-lg font-bold text-[#FFFBE7] mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#F9D949]" />
            Trade Preview
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-[#FFFBE7]/50 mb-1">Position Size</div>
              <div className="text-lg font-bold text-[#FFFBE7]">
                {positionSize.toFixed(2)} {account.currency}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#FFFBE7]/50 mb-1">Est. Commission</div>
              <div className="text-lg font-bold text-[#F9D949]">
                {estimatedCommission.toFixed(2)} {account.currency}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#FFFBE7]/50 mb-1">Risk Amount</div>
              <div className="text-lg font-bold text-[#F87171]">
                {riskAmount.toFixed(2)} {account.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 rounded-xl bg-[#F87171]/10 border border-[#F87171]/30 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#F87171]" />
            <p className="text-sm text-[#F87171]">{errors.submit}</p>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="p-4 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#4ADE80]" />
            <p className="text-sm text-[#4ADE80]">Trade executed successfully!</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-[#7C2F39]/50 text-[#FFFBE7]/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#7C2F39] to-[#991B1B] text-[#FFFBE7] hover:from-[#991B1B] hover:to-[#7C2F39]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-[#FFFBE7]/30 border-t-[#FFFBE7] rounded-full animate-spin" />
              Executing Trade...
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              {paperTrade ? 'Execute Paper Trade' : 'Execute Live Trade'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
