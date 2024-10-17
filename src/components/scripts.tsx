import Script from "next/script";

const ThirdPartyScripts = () => {
  if (process.env.NODE_ENV == "development") {
    return null;
  }

  return (
    <>
      <Script
        id="ph_referral_track"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              function removeTrailingSlash(url) {
                  return url.endsWith('/') ? url.slice(0, -1) : url;
              }

              (function() {
                var referrer = document.referrer;
                if (!referrer.includes('upstash.com')) {
                  document.cookie = 'ph_referral_track=' + removeTrailingSlash(referrer) + '; domain=.upstash.com';
                }
              })();
            `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-QW5KRSTDM0`}
      />
      <Script
        id="ga"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
                      function gtag(){ dataLayer.push(arguments); }
                      gtag('js', new Date());
                      gtag('config', 'G-QW5KRSTDM0');`,
        }}
      />
    </>
  );
};

export default ThirdPartyScripts;
