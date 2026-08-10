import { useEffect, useState } from "react";

export const AFFILIATE_CODE = "code";

// Read the code off window rather than taking server `searchParams`: consuming
// searchParams on the page marks it dynamic, which drops `/` from the sitemap
// and loses its static prerender.
export const useSetAffiliateCodeToSessionStorage = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get(
      AFFILIATE_CODE,
    );
    if (code) {
      sessionStorage.setItem(AFFILIATE_CODE, code);
    }
  }, []);
};

export const useGetAffiliateCodeFromSessionStorage = () => {
  const [affiliateCode, setAffiliateCode] = useState<string>();

  useEffect(() => {
    const affiliateCode = sessionStorage.getItem(AFFILIATE_CODE);
    if (affiliateCode) {
      setAffiliateCode(affiliateCode);
    }
  }, []);

  return { affiliateCode };
};
