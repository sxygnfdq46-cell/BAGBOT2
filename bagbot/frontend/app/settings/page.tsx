'use client';

import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0810] via-[#1A0E15] to-[#150A12] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFF8E7] to-[#F9D949] bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-lg text-[#D4B5C4]">Configure your trading preferences</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Notifications', desc: 'Manage alerts and notifications', icon: Bell, color: 'from-[#F9D949] to-[#FDE68A]' },
            { title: 'Security', desc: 'Account security settings', icon: Shield, color: 'from-[#4ADE80] to-[#22C55E]' },
            { title: 'Appearance', desc: 'Customize your dashboard', icon: Palette, color: 'from-[#C75B7A] to-[#E5B299]' },
            { title: 'General', desc: 'General application settings', icon: SettingsIcon, color: 'from-[#60A5FA] to-[#3B82F6]' }
          ].map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30 hover:border-[#F9D949]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${setting.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#FFF8E7]">{setting.title}</h3>
                    <p className="text-[#D4B5C4]">{setting.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
