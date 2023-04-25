import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/border-box";

export default function DesignedForTheEdge() {
  return (
    <BorderBox className="col-span-2">
      <BorderBoxBody>
        <header>
          <BorderBoxBodyTitle className="">
            Designed for the edge
          </BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            Tested and optimized for Vercel Edge, Cloudflare Workers and Fastly
            Edge.
          </BorderBoxBodySummary>
        </header>

        {/* body */}
        <div>deneme</div>
      </BorderBoxBody>
    </BorderBox>
  );
}
