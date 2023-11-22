import { ParsedUrlQueryInput } from "querystring";
import { useEffect, useState } from "react";

export const AFFILIATE_CODE = "code";

export const useSetAffiliateCodeToSessionStorage = (
  searchParams: ParsedUrlQueryInput,
) => {
  useEffect(() => {
    if (searchParams.code) {
      sessionStorage.setItem(AFFILIATE_CODE, searchParams.code as string);
    }
  }, [searchParams]);
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
