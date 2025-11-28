"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/responsive.css';
import '../styles/ultra-wide.css';
import '../styles/animations.css';
import { threatSyncOrchestrator } from "@/engines/threat/ThreatSyncOrchestrator";
import '../styles/glow-refinement.css';
import '../styles/shadow-refinement.css';
import '../styles/cognitive-fusion.css';
import '../styles/entity-mode.css';
import '../styles/entity-expression.css';
import '../styles/entity-drift.css';
import '../styles/reflex-visual.css';
import { ThemeProvider } from './providers';
import GodModeIntro from './components/intro/GodModeIntro';
import { BehaviorProvider } from './engine/bic/BehaviorProvider';
import { CognitiveFusionProvider } from './engine/cognitive/CognitiveFusionProvider';
import { EntityProvider } from './engine/entity/EntityProvider';
import { MemoryImprintProvider } from './engine/entity/MemoryImprintProvider';
import { EnvironmentalConsciousnessCore } from './engine/environmental/EnvironmentalConsciousnessCore';
import { EnvironmentalFusionProvider } from './engine/fusion';
import { StabilityProvider } from './engine/reflex';
import { IdentityPersistenceLayer } from './components/presence/IdentityPersistenceLayer';
import { SymbioticGuardianProvider } from './components/guardian/SymbioticGuardianProvider';
import { SovereignProvider } from './components/sovereignty/SovereignProvider';
import Navigation from './components/navigation/Navigation';
import ThreatOverlay from './components/threat/ThreatOverlay';
import ThreatReactivePanel from './components/threat/ThreatReactivePanel';
import SafeModeBanner from '../components/SafeModeBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BagBot 2.0 — Alien Trading Terminal',
  description: 'The world\'s most futuristic sci-fi trading interface',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Initialize threat sync orchestrator */}
        {typeof window !== 'undefined' && threatSyncOrchestrator}
        
        {/* 🛡️ SAFE MODE BANNER - Shows when trading is disabled */}
        <SafeModeBanner />
        
        <GodModeIntro />
        <ThreatOverlay />
        <ThreatReactivePanel />
        <SymbioticGuardianProvider enableProtection={true} enableBalancing={true}>
          <SovereignProvider>
            <IdentityPersistenceLayer enableCrossTabSync={true} enableGPUEffects={true}>
              <BehaviorProvider>
            <CognitiveFusionProvider>
              <EnvironmentalConsciousnessCore updateInterval={1000} enabled={true}>
                <EnvironmentalFusionProvider>
                  <StabilityProvider updateInterval={16} enabled={true}>
                    <EntityProvider>
                      <MemoryImprintProvider>
                        <ThemeProvider>
                          {/* Plasma Grid Background */}
                          <div className="plasma-grid" />
                          
                          {/* Global Navigation */}
                          <Navigation />
                          
                          {children}
                        </ThemeProvider>
                      </MemoryImprintProvider>
                    </EntityProvider>
                  </StabilityProvider>
                </EnvironmentalFusionProvider>
              </EnvironmentalConsciousnessCore>
            </CognitiveFusionProvider>
          </BehaviorProvider>
        </IdentityPersistenceLayer>
      </SovereignProvider>
    </SymbioticGuardianProvider>
    </body>
    </html>
  );
}
