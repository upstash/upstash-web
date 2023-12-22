"use client";

import { useEffect, useState } from "react";

export const useGetAffiliateCodeFromApi = () => {
  const [affiliateCode, setAffiliateCode] = useState<string>();

  useEffect(() => {
    fetch("/api/get-affiliate-code")
      .then((res) => res.json())
      .then((res: { affiliateCode: string }) => {
        setAffiliateCode(res.affiliateCode);
      });
  }, []);
  return { affiliateCode };
};
