import cx from "@/utils/cx";
import { IconBrandX, IconWorld } from "@tabler/icons-react";

export type AuthorSocialLinks = {
  name: string;
  /** Twitter/X handle without the leading "@". */
  twitter?: string;
  /** Full URL to a personal site. */
  website?: string;
};

type Props = {
  author: AuthorSocialLinks;
  size?: number;
  className?: string;
};

/**
 * Renders the optional social links (Twitter/X, personal website) for a blog
 * author. Returns nothing when the author has no links configured, so callers
 * can drop it in unconditionally.
 */
export default function AuthorSocials({ author, size = 18, className }: Props) {
  const links = [
    author.twitter && {
      key: "twitter",
      href: `https://x.com/${author.twitter}`,
      label: `${author.name} on X`,
      icon: <IconBrandX size={size} />,
    },
    author.website && {
      key: "website",
      href: author.website,
      label: `${author.name}'s website`,
      icon: <IconWorld size={size} />,
    },
  ].filter(Boolean) as {
    key: string;
    href: string;
    label: string;
    icon: React.ReactNode;
  }[];

  if (links.length === 0) return null;

  return (
    <div className={cx("flex items-center gap-1.5", className)}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={cx(
            "inline-flex items-center justify-center rounded-full p-1.5",
            "text-text-mute opacity-70 transition",
            "hover:bg-bg-mute hover:text-primary-text hover:opacity-100",
          )}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
