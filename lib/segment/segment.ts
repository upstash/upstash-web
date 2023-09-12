"use client"


import { AnalyticsBrowser, Analytics } from '@segment/analytics-next'


export type EventName = |
  "button.pricing.redis" |
  "button.pricing.kafka" |
  "button.pricing.qstash" |
  "button.create.redis" |
  "button.create.kafka" |
  "button.create.qstash" |
  "button.examples.redis" |
  "button.examples.kafka" |
  "button.examples.qstash" |
  "button.docs.redis" |
  "button.docs.kafka" |
  "button.docs.qstash" |
  "button.pricing" |
  "button.fast-anywhere.refresh"




class Segment {
  private analytics: Analytics | null = null

  async load(writeKey: string): Promise<void> {
    if (this.analytics) {
      return
    }
    const [analytics] = await AnalyticsBrowser.load({ writeKey })
    this.analytics = analytics
  }

  public async track(eventName: EventName) {
    await this.analytics?.track(eventName)
  }

  public async page() {
    await this.analytics?.page()
  }
}
const SEGMENT_WRITE_KEY: string = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY? process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY : ""

const segment = new Segment()

segment.load(SEGMENT_WRITE_KEY)

export {segment}
