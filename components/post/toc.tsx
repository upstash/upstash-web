import { Post } from "contentlayer/generated";
import { PostHeading } from "@/contentlayer.config";

type Props = {
  post: Post;
};

export default function PostTOC({ post }: Props) {
  if (post.headings.length === 0) return null;

  return (
    <div className="grid">
      {post.headings.map((heading: PostHeading) => {
        return (
          <a
            key={heading.slug}
            href={`#${heading.slug}`}
            className={`post-headings-link h${heading.level}`}
          >
            <span className="post-headings-link-dot" />
            <span className="post-headings-link-text">{heading.title}</span>
          </a>
        );
      })}
    </div>
  );
}
