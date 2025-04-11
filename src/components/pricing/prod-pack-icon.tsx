import { PROD_PACK_SECTION_ID } from "@/constants";

export const ProdPackIcon = () => {
  return (
    <a
      className="cursor-pointer text-primary-text hover:underline"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(PROD_PACK_SECTION_ID)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
    >
      +Prod Pack
    </a>
  );
};
