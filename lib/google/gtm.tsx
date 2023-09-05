type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const GTM_ID = "GTM-57DWFWHM";

export const pageview = (url: string) => {
  console.log("pageview!!!!");
  if (typeof window.dataLayer !== "undefined") {
    console.log("SELAM");
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  } else {
    console.log("SELAM2");
    console.log({
      event: "pageview",
      page: url,
    });
  }
};
