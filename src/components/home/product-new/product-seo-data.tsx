import { Product } from "@/utils/type";
import {
  PRODUCT_FEATURES,
  PRODUCT_TAGLINES,
} from "./product-features";

/**
 * Crawlable, screen-reader-only mirror of the non-default product tabs.
 *
 * The interactive product section only renders the tab the user has selected
 * (default: Redis), so the other products' taglines and feature copy never
 * reach the server-rendered HTML. This block renders those products from the
 * same PRODUCT_FEATURES / PRODUCT_TAGLINES source, so search engines and AI
 * crawlers that fetch the page as HTML still get every product's content.
 * Redis is omitted because it is the default tab and already in the HTML. It
 * mirrors content the user can reach by clicking the tabs, so it is not
 * hidden/deceptive.
 */
const SEO_PRODUCTS = [
  Product.VECTOR,
  Product.QSTASH,
  Product.WORKFLOW,
  Product.BOX,
] as const;

export default function ProductSeoData() {
  return (
    <section className="sr-only">
      <h2>Upstash Serverless Data Platform — products</h2>
      {SEO_PRODUCTS.map((product) => (
        <article key={product}>
          <h3>
            {product}: {PRODUCT_TAGLINES[product].title}
          </h3>
          {PRODUCT_FEATURES[product].map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4>{group.title.join(" ")}</h4>
              <ul>
                {group.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
          <p>
            Learn more in the{" "}
            <a href={PRODUCT_TAGLINES[product].docsLink}>
              {product} documentation
            </a>
            .
          </p>
        </article>
      ))}
    </section>
  );
}
