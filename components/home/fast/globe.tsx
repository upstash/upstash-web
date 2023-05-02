"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function AnimatedGlobe() {
  const canvasRef = useRef<any>();
  const w = 1540;
  const h = 1540;

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: w * 2,
      height: h * 2,
      phi: 0,
      theta: 0,
      opacity: 0.8,
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
        state.phi = phi;
        phi += 0.001;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: w, height: h, aspectRatio: 1 }} />
  );
}

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
];
