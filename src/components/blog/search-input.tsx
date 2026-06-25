import cx from "@/utils/cx";
import { IconSearch, IconX } from "@tabler/icons-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search posts...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const isSearching = value.trim().length > 0;

  return (
    <div className="mt-8 flex justify-center">
      <div className="relative w-full max-w-md">
        <IconSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-mute"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cx(
            "w-full rounded-full border border-black/10 bg-bg-mute py-3 pl-11 pr-10 dark:border-white/10",
            "text-sm text-text outline-none placeholder:text-text-mute",
            "focus:border-primary/40 focus:ring-primary/20 transition focus:ring-2",
          )}
        />
        {isSearching && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mute transition hover:text-primary-text"
            aria-label="Clear search"
          >
            <IconX size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
