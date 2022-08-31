import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "react-globe.gl";

type arcsData = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

const REGIONS = {
  oregon: {
    lat: "44.1274576",
    lng: "-122.8257181",
  },
  n_virginia: {
    lat: "37.4784129",
    lng: "-76.4618534",
  },
  sao_paulo: {
    lat: "-23.6820347",
    lng: "-46.735724",
  },
  singapore: {
    lat: "1.3143394",
    lng: "103.7038242",
  },
  frankfurt: {
    lat: "50.1213009",
    lng: "8.5663531",
  },
};

function getRandomArcData() {
  // @ts-ignore
  return [...Array(3).keys()].map(() => {
    const selectedRegion =
      Object.keys(REGIONS)[
        Math.floor(Math.random() * Object.keys(REGIONS).length)
      ];
    const region = REGIONS[selectedRegion];

    return {
      startLat: region.lat,
      startLng: region.lng,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: "#00e9a3",
    };
  });
}

export default function AnimatedGlobe({ ...props }) {
  const [arcsData, setArcsData] = useState<arcsData[]>(getRandomArcData());
  const [countries, setCountries] = useState({ features: [] });
  const [globeMaterial, setGlobeMaterial] = useState(
    new THREE.MeshPhongMaterial()
  );

  // const [arcs, setArcs] = useState([] as arcsData[]);
  const globeRef = useRef() as any;

  useEffect(() => {
    fetch("/globe-data.json")
      .then((res) => res.json())
      .then(setCountries);

    // globeRef.current.controls().enabled = false;
    globeRef.current.controls().rotate = false;
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.3;

    setGlobeMaterial(
      new THREE.MeshPhongMaterial({
        color: "#111",
        shininess: 14,
      })
    );

    setInterval(() => {
      setArcsData(getRandomArcData());
    }, 3000);
  }, []);

  return (
    <Globe
      ref={globeRef}
      // animateIn={false}
      width={600}
      height={600}
      backgroundColor="rgba(0, 0, 0, 0)"
      globeMaterial={globeMaterial}
      onGlobeClick={(a) => {
        console.log(a);
      }}
      //
      // HEX POLYGONS
      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.7}
      hexPolygonColor={() => "#888"}
      //
      // ATMOSPHERE
      atmosphereColor={"#fff"}
      // atmosphereColor={"#00e9a3"}
      atmosphereAltitude={0.1}
      //
      // ARCS
      arcsData={arcsData}
      arcColor="color"
      arcStroke={0.1}
      arcAltitudeAutoScale={0.3}
      arcDashLength={0.3}
      arcDashGap={2}
      arcDashInitialGap={1}
      arcDashAnimateTime={2000}
      arcsTransitionDuration={0}
      //
      {...props}
    />
  );
}
