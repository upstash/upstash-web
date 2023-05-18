"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

export default function GlobeClient() {
  const divRef = useRef<any>();
  const entry = useIntersectionObserver(divRef, {});
  const isVisible = !!entry?.isIntersecting;
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowGlobe(true);
    } else {
      setShowGlobe(false);
    }
  }, [isVisible]);

  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = window.document.createElement("canvas");
      const ctx =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      (ctx as any).getSupportedExtensions();
    } catch (e) {
      // WebGL isn't properly supported
      setWebglSupported(false);
      console.log("WebGL not supported, hiding globe animation...");
      return;
    }
  }, []);

  return (
    <div
      ref={divRef}
      className={`${
        webglSupported ? "min-h-[500px] sm:min-h-[1000px]" : "min-h-[50px]"
      } h-full`}
    >
      {webglSupported && showGlobe && <GlobeAnimation />}
    </div>
  );
}

const GlobeAnimation = () => {
  const canvasRef = useRef<any>();

  const [{ r }] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = -0.5;
    let width = 0;

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width,
      height: width,
      phi: 0,
      theta: 0,
      opacity: 0.9,
      scale: 1,
      dark: 1,
      diffuse: 1,
      mapSamples: 36000, // dots count
      mapBrightness: 8, // dots opacity
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.1, 0.4, 0.3],
      glowColor: [0.04, 0.06, 0.05],
      markers: REGIONS.map((region) => ({
        location: [region.lat, region.lng],
        size: 0.03,
      })),
      onRender: (state) => {
        phi += 0.001;
        state.phi = phi + r.get();
        state.width = width;
        state.height = width;
      },
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"));

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1",
        contain: "layout paint size",
        opacity: 0,
        transition: "opacity 1s ease",
      }}
    />
  );
};

const REGIONS = [
  {
    name: "oregon",
    lat: 44.1274576,
    lng: -122.8257181,
  },
  {
    name: "n_virginia",
    lat: 37.4784129,
    lng: -76.4618534,
  },
  {
    name: "sao_paulo",
    lat: -23.6820347,
    lng: -46.735724,
  },
  {
    name: "singapore",
    lat: 1.3143394,
    lng: 103.7038242,
  },
  {
    name: "frankfurt",
    lat: 50.1213009,
    lng: 8.5663531,
  },
  {
    name: "london",
    lat: 51.5287718,
    lng: -0.2416804,
  },
  {
    name: "mumbai",
    lat: 19.0759899,
    lng: 72.8773928,
  },
  {
    name: "sydney",
    lat: -33.8548157,
    lng: 151.2164539,
  },
  {
    name: "tokyo",
    lat: 35.6828387,
    lng: 139.7594549,
  },
  {
    name: "seoul",
    lat: 37.5666791,
    lng: 126.9782914,
  },
  {
    name: "hong_kong",
    lat: 22.2793278,
    lng: 114.1628131,
  },
  {
    name: "osaka",
    lat: 34.6937378,
    lng: 135.5021651,
  },
  {
    name: "stockholm",
    lat: 59.3251172,
    lng: 18.0710935,
  },
];
