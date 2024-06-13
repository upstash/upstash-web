"use client";

import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";

export type EventName =
  | "button.pricing.redis"
  | "button.pricing.qstash"
  | "button.pricing.vector"
  | "button.create.redis"
  | "button.create.qstash"
  | "button.create.vector"
  | "button.examples.redis"
  | "button.examples.qstash"
  | "button.examples.vector"
  | "button.docs.redis"
  | "button.docs.qstash"
  | "button.docs.vector"
  | "button.pricing"
  | "button.fast-anywhere.refresh";

export class Segment {
  private analytics: Analytics | null = null;

  async load(writeKey: string): Promise<void> {
    if (this.analytics || typeof window === "undefined") {
      return;
    }
    const [analytics] = await AnalyticsBrowser.load({ writeKey });
    this.analytics = analytics;
  }

  public async track(eventName: EventName) {
    await this.analytics?.track(eventName);
  }
}
