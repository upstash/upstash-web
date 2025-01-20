import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export const PolicyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return;

  return (
    <div className="w-full border-b border-[#2A2A2A] bg-[#1A1A1A]">
      <div className="relative mx-auto flex max-w-7xl items-center gap-4 py-3">
        <div className="w-full text-center">
          <span className="text-sm text-gray-300">
            Our{" "}
            <a
              href="/trust/terms.pdf"
              className="text-[#00E699] underline hover:text-[#00ff99]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/trust/dpa.pdf"
              className="text-[#00E699] underline hover:text-[#00ff99]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Protection Agreement
            </a>{" "}
            have been updated. Review changes.
          </span>
        </div>
        <div
          onClick={() => {
            console.log("click");
            setIsVisible(false);
          }}
          className="absolute right-10 cursor-pointer text-gray-400 transition-colors hover:text-white"
          aria-label="Close banner"
        >
          <IconX />
        </div>
      </div>
    </div>
  );
};
