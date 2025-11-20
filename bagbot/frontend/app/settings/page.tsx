'use client';

import React from 'react';
import { Settings, Bell, Lock, User, Zap } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF8E7] flex items-center gap-2 sm:gap-3">
          <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-[#F9D949]" />
          Settings
        </h1>
        <p className="text-sm sm:text-base text-[#D4B5C4] mt-1 sm:mt-2">Manage your trading bot preferences and account settings</p>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Profile Settings */}
        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9D949]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#FFF8E7]">Profile Settings</h2>
          </div>
          <p className="text-sm sm:text-base text-[#D4B5C4]">Manage your account information and preferences</p>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9D949]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#FFF8E7]">Notifications</h2>
          </div>
          <p className="text-sm sm:text-base text-[#D4B5C4]">Configure alerts for trading signals and system events</p>
        </div>

        {/* Security */}
        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9D949]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#FFF8E7]">Security</h2>
          </div>
          <p className="text-sm sm:text-base text-[#D4B5C4]">Manage password, 2FA, and API keys</p>
        </div>

        {/* Trading Bot Settings */}
        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9D949]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#FFF8E7]">Trading Bot</h2>
          </div>
          <p className="text-[#D4B5C4]">Configure trading strategies and risk parameters</p>
        </div>
      </div>
    </div>
  );
}
