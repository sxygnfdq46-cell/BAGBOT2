import { PulsarScanner } from "./PulsarScanner";

export interface PulsarAnalysis {
  strength: number;
  confidence: number;
  liquidity: number;
  trendBreak: number;
  shockScore: number;
  direction: "UP" | "DOWN" | "FLAT";
}

/**
 * PulsarRuntime
 * Acts as a safe runtime adapter that processes raw market data
 * using the PulsarScanner and returns a normalized intelligence packet.
 */
export default class PulsarRuntime {
  private scanner: PulsarScanner;

  constructor(scanner?: PulsarScanner) {
    this.scanner = scanner ?? new PulsarScanner();
  }

  /**
   * Analyze incoming market data and return normalized pulsar intelligence.
   * Expected data includes:
   *  - strength
   *  - confidence
   *  - liquidityShock
   *  - trendBreak
   *  - volatilityShock
   */
  analyze(data: any): PulsarAnalysis {
    const result = this.scanner.scan(data);

    return {
      strength: result.strength ?? 0,
      confidence: result.confidence ?? 0,
      liquidity: result.liquidityShock ?? 0,
      trendBreak: result.trendBreak ?? 0,
      shockScore: result.shock ?? 0,
      direction: result.direction ?? "FLAT",
    };
  }
}
