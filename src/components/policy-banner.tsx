import { useState } from "react";

export const PolicyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full border-b border-[#2A2A2A] bg-[#1A1A1A]">
      <div className="flex items-center justify-between px-10 py-3 mx-auto max-w-7xl">
        <div className="flex items-center gap-x-3">
          <span className="text-sm font-medium text-[#00E699]">Updates</span>
          <span className="text-sm text-gray-300">
            We've updated our Terms and Privacy Policy. Please review the
            changes.
            <a
              href="/terms"
              className="ml-2 text-[#00E699] underline hover:text-[#00ff99]"
            >
              Learn more
            </a>
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
