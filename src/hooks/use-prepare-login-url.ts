import { useEffect, useMemo, useState } from "react";

import { useGetAffiliateCodeFromApi } from "./use-affiliate-code";

export const usePrepareLoginUrl = () => {
  const [posthogDistinctId, setPosthogDistinctId] = useState("");
  const { affiliateCode } = useGetAffiliateCodeFromApi();

  useEffect(() => {
    const getDistinctId = () => {
      const distinctId = localStorage.getItem("distinctId");
      return Boolean(distinctId) ? distinctId : false;
    };

    const intervalId = setInterval(() => {
      const id = getDistinctId();
      if (id) {
        setPosthogDistinctId(id);
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const loginUrl = useMemo(() => {
    if (!posthogDistinctId) return "#";
    const baseUrl = "https://console.upstash.com";
    const params = new URLSearchParams({
      landingDistinctId: posthogDistinctId,
    });
    if (affiliateCode) params.append("code", affiliateCode);
    return `${baseUrl}?${params.toString()}`;
  }, [posthogDistinctId, affiliateCode]);

  return { loginUrl, posthogDistinctId, affiliateCode };
};
