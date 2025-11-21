'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Zap, Activity } from 'lucide-react';

/**
 * Landing Page - Beautiful Maroon/Cream/Gold Theme
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0810] via-[#1A0E15] to-[#150A12]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#C75B7A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#F9D949]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C75B7A]/20 to-[#F9D949]/20 border border-[#C75B7A]/30 text-[#F9D949] font-semibold text-sm backdrop-blur-sm">
                🚀 AI-Powered Trading Platform
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#FFF8E7] via-[#F9D949] to-[#E5B299] bg-clip-text text-transparent">
                Trade Smarter
              </span>
              <br />
              <span className="text-[#FFF8E7]">Not Harder</span>
            </h1>

            <p className="text-2xl text-[#D4B5C4] max-w-3xl mx-auto mb-12 leading-relaxed">
              Professional automated trading platform powered by advanced algorithms.
              Join thousands maximizing profits 24/7.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-2xl bg-gradient-to-r from-[#C75B7A] to-[#F9D949] text-[#FFF8E7] font-bold text-xl hover:scale-105 transform transition-all shadow-2xl shadow-[#C75B7A]/50 hover:shadow-[#F9D949]/50"
            >
              Launch Dashboard
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
          >
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Total Volume', value: '$2.5M' },
              { label: 'Win Rate', value: '68%' },
              { label: 'Uptime', value: '99.9%' }
            ].map((stat, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/20 backdrop-blur-sm"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#F9D949] to-[#FDE68A] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-[#D4B5C4]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFF8E7] to-[#F9D949] bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-[#D4B5C4]">Everything you need to dominate the markets</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Execute trades in milliseconds' },
              { icon: Shield, title: 'Secure', desc: 'Bank-level encryption' },
              { icon: TrendingUp, title: 'Smart Analytics', desc: 'AI-powered insights' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-[#2A1721]/90 to-[#1A0E15]/90 border border-[#C75B7A]/20 hover:border-[#F9D949]/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#C75B7A] to-[#F9D949] flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[#FFF8E7]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FFF8E7] mb-3">{feature.title}</h3>
                  <p className="text-[#D4B5C4] text-lg">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center p-16 rounded-3xl bg-gradient-to-br from-[#C75B7A]/20 via-[#2A1721]/90 to-[#F9D949]/20 border border-[#E5B299]/30 backdrop-blur-xl"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFF8E7] via-[#F9D949] to-[#E5B299] bg-clip-text text-transparent">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-[#D4B5C4] mb-10 max-w-2xl mx-auto">
            Join the future of automated trading today
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-12 py-6 rounded-2xl bg-gradient-to-r from-[#F9D949] to-[#FDE68A] text-[#0F0810] font-bold text-xl hover:scale-105 transform transition-all shadow-2xl"
          >
            Get Started Now
            <Activity className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#C75B7A]/20 py-8 px-4 backdrop-blur-xl bg-[#2A1721]/30">
        <div className="max-w-7xl mx-auto text-center text-[#D4B5C4]">
          © 2025 BagBot. Built with ❤️ for traders.
        </div>
      </footer>
    </div>
  );
}
