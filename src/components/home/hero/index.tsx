"use client";

import Button from "@/components/button";
import Container from "@/components/container";
import HomeHeroBg from "@/components/home/hero/hero-bg";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import HomeHeroSlogan from "@/components/home/hero/hero-slogan";
import CodeQStash from "@/components/home/serverless/code-qstash";
import CodeRedis from "@/components/home/serverless/code-redis";
import CodeVector from "@/components/home/serverless/code-vector";
import IconQStash from "@/components/icon-qstash";
import IconVector from "@/components/icon-vector";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import {
  IconArrowRight,
  IconCircle1,
  IconCircle2,
  IconCircle3,
  IconCircleCheckFilled,
  IconNotes,
  IconPlus,
} from "@tabler/icons-react";
import React, { useState } from "react";

export default function HomeHero() {
  const [activeProduct, setActiveProduct] = useState<Product>(Product.REDIS);

  return (
    <>
      <section className="relative z-10 py-20">
        <HomeHeroBg activeProduct={activeProduct} />

        <Container>
          <HomeHeroSlogan activeProduct={activeProduct} />

          <h2
            className={cx(
              "mt-2 text-lg md:mt-4 md:text-3xl md:font-light",
              "bg-gradient-to-r from-20% bg-clip-text text-transparent",
              "from-white/30 to-white/60",
            )}
          >
            The single platform to all your data needs
          </h2>

          <Button
            type="button"
            className={cx(
              "mt-6 text-lg",
              activeProduct === Product.REDIS && "bg-red-500",
              activeProduct === Product.VECTOR && "bg-orange-500",
              activeProduct === Product.QSTASH && "bg-purple-500",
              activeProduct === Product.QSTASH && "bg-purple-500",
            )}
            href="https://console.upstash.com"
            icon={<IconArrowRight stroke={1.5} size={24} />}
          >
            {activeProduct === Product.REDIS && "Create Database"}
            {activeProduct === Product.VECTOR && "Create Index"}
            {activeProduct === Product.QSTASH && "Publish Message"}
            {activeProduct === Product.Workflow && "Start Workflow"}
          </Button>
        </Container>
      </section>

      <section>
        <Container>
          <div className="relative flex items-end justify-center gap-2 md:mt-6">
            {/*<span className="absolute -inset-x-2 -bottom-px h-px bg-bg-mute" />*/}
            <HomeHeroProducts
              activeProduct={activeProduct}
              setActiveProduct={setActiveProduct}
            />
          </div>
        </Container>

        <Container
          className={cx(
            "grid place-items-center gap-8 rounded-4xl p-10",
            activeProduct === Product.REDIS && "bg-red-50 text-red-950",
            activeProduct === Product.VECTOR && "bg-orange-50 text-orange-950",
            activeProduct === Product.QSTASH && "bg-purple-50 text-purple-950",
          )}
        >
          {activeProduct === Product.REDIS && (
            <>
              {/* bullets */}
              <div className="grid w-full gap-8 md:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-2xl bg-red-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-red-700">
                    Highly Available, <br /> Infinitely Scalable
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircle1
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      99.99% uptime guarantee
                    </li>
                    <li>
                      <IconCircle2
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      Automatic scaling to meet your demands
                    </li>
                    <li>
                      <IconCircle3
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      No server management required
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-red-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-red-700">
                    Global <br /> Low Latency
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircle1
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      Lightning-fast response times worldwide
                    </li>
                    <li>
                      <IconCircle2
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      Multi-region replication options
                    </li>
                    <li>
                      <IconCircle3
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      Optimize for your users, wherever they are
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-red-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-red-700">
                    Durable, <br /> Persistent Storage
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircle1
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      In-memory speed with disk-like persistence
                    </li>
                    <li>
                      <IconCircle2
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      Data safety without sacrificing performance
                    </li>
                    <li>
                      <IconCircle3
                        size={24}
                        stroke={2}
                        className="shrink-0 text-red-700"
                      />
                      Automatic backups
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full rounded-2xl bg-bg">
                <div className="min-h-full rounded-2xl bg-red-950/30 p-8">
                  <CodeRedis />
                </div>
              </div>
            </>
          )}
          {activeProduct === Product.VECTOR && (
            <>
              {/**/}

              <header>
                <h2
                  className={cx(
                    "flex items-center justify-center gap-3",
                    "font-display text-4xl font-semibold text-orange-700",
                  )}
                >
                  <IconVector className="inline-flex" width={34} />
                  Vector
                </h2>

                <h3 className="mt-2 font-display text-xl opacity-80 md:text-2xl">
                  High-Scale, Efficient Vector Database with Built-in
                  Intelligence
                </h3>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    className="bg-white text-orange-700 shadow"
                    href="https://console.upstash.com"
                    icon={<IconNotes stroke={1.5} size={24} />}
                  >
                    Documentation
                  </Button>

                  <Button
                    type="button"
                    className="bg-orange-700 shadow"
                    href="https://console.upstash.com"
                    icon={<IconPlus stroke={1.5} size={24} />}
                  >
                    Create Database
                  </Button>
                </div>
              </header>

              <div className="grid w-full gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-bg">
                  <div className="min-h-full rounded-2xl bg-orange-950/30 p-8">
                    <CodeVector />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-orange-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-orange-700">
                    Highly Available & <br /> Infinitely Scalable
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      99.99% uptime guarantee
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      Automatic scaling to meet your demands
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      No server management required
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-orange-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-orange-700">
                    Global Low Latency
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      Lightning-fast response times worldwide
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      Multi-region replication options
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      Optimize for your users, wherever they are
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-orange-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-orange-700">
                    Durable & Persistent Storage
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      In-memory speed with disk-like persistence
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      Data safety without sacrificing performance
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-orange-700"
                      />
                      Automatic backups and point-in-time recovery
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {activeProduct === Product.QSTASH && (
            <>
              <header>
                <h2
                  className={cx(
                    "flex items-center justify-center gap-3",
                    "font-display text-4xl font-semibold text-purple-600",
                  )}
                >
                  <IconQStash className="inline-flex" width={34} />
                  QStash
                </h2>

                <h3 className="mt-2 font-display text-xl opacity-80 md:text-2xl">
                  Powerful Serverless Messaging and Task Scheduling
                </h3>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    className="bg-white text-purple-600 shadow"
                    href="https://console.upstash.com"
                    icon={<IconNotes stroke={1.5} size={24} />}
                  >
                    Documentation
                  </Button>

                  <Button
                    type="button"
                    className="bg-purple-600 shadow"
                    href="https://console.upstash.com"
                    icon={<IconPlus stroke={1.5} size={24} />}
                  >
                    Create Database
                  </Button>
                </div>
              </header>

              {/* bullets */}
              <div className="grid w-full gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-bg">
                  <div className="min-h-full rounded-2xl bg-purple-950/30 p-8">
                    <CodeQStash />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-purple-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-purple-700">
                    Highly Available & <br /> Infinitely Scalable
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      99.99% uptime guarantee
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      Automatic scaling to meet your demands
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      No server management required
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-purple-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-purple-700">
                    Global Low Latency
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      Lightning-fast response times worldwide
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      Multi-region replication options
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      Optimize for your users, wherever they are
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-purple-900/10 p-8 text-left">
                  <h4 className="font-display text-2xl font-semibold text-purple-700">
                    Durable & Persistent Storage
                  </h4>

                  <ul className="font-medium *:flex *:items-start *:gap-2 *:py-1">
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      In-memory speed with disk-like persistence
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      Data safety without sacrificing performance
                    </li>
                    <li>
                      <IconCircleCheckFilled
                        size={24}
                        stroke={2}
                        className="relative top-0.5 shrink-0 text-purple-700"
                      />
                      Automatic backups and point-in-time recovery
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
