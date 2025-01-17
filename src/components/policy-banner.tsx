import { useState } from "react";

export const PolicyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return;

  return (
    <div className="w-full border-b border-[#2A2A2A] bg-[#1A1A1A]">
      <div className="flex items-center justify-center gap-4 px-10 py-3 mx-auto max-w-7xl">
        <div className="flex items-center gap-x-3">
          <span className="text-sm text-gray-300">
            We've updated our{" "}
            <a
              href="/trust/terms.pdf"
              className="text-[#00E699] underline hover:text-[#00ff99]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>{" "}
            and our{" "}
            <a
              href="/trust/privacy.pdf"
              className="text-[#00E699] underline hover:text-[#00ff99]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            . Please review the changes.
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 transition-colors hover:text-white"
          aria-label="Close banner"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PolicyBanner;
