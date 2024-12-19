"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useDarkMode } from "usehooks-ts";

export default function EnterpriseCobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDarkMode } = useDarkMode();
  const cobeWidth = 2000;

  useEffect(() => {
    let phi = 0;

    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: cobeWidth * 2,
        height: cobeWidth * 2,
        phi: 0,
        theta: 0,
        dark: isDarkMode ? 1 : 0,
        diffuse: 1,
        scale: 1,
        mapSamples: 30000,
        mapBrightness: isDarkMode ? 3 : 10,
        opacity: 1,
        baseColor: [1, 1, 1],
        markerColor: [1, 1, 1],
        glowColor: [0.6, 0.9, 0.8],
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.0006;
        },
      });

      return () => {
        globe.destroy();
      };
    }
  }, [isDarkMode]);

  return (
    <div className="relative -z-10 -mt-60 aspect-video h-[500px] w-full overflow-hidden">
      <span className="absolute inset-x-0 bottom-0 z-10 h-full bg-gradient-to-t from-bg" />

      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-0 -translate-x-1/2 opacity-60"
        style={{
          width: cobeWidth,
          height: cobeWidth,
          aspectRatio: 1,
        }}
      />
    </div>
  );
}
