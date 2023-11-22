import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const AFFILIATE_CODE = "code";

export const useSetAffiliateCodeToSessionStorage = () => {
  const searchParams = useSearchParams();

  const code = searchParams?.get(AFFILIATE_CODE);

  useEffect(() => {
    console.log("Save to sessionstorage", code);
    if (code) {
      sessionStorage.setItem(AFFILIATE_CODE, code as string);
    }
  }, [code]);
};

export const useGetAffiliateCodeFromSessionStorage = () => {
  const [affiliateCode, setAffiliateCode] = useState<string>();

  useEffect(() => {
    const affiliateCode = sessionStorage.getItem(AFFILIATE_CODE);
    console.log("get from sessionstorage", affiliateCode);
    if (affiliateCode) {
      setAffiliateCode(affiliateCode);
    }
  }, []);

  return { affiliateCode };
};
