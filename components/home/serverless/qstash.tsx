import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/home/border-box";
import cx from "@/utils/cx";
import LinkNew from "@/components/link-new";

export default function ServerlessQStash() {
  return (
    <BorderBox className="col-span-2">
      <BorderBoxBody className="flex flex-col gap-8">
        <header>
          <BorderBoxBodyTitle>QStash</BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            The data is replicated across multiple regions
          </BorderBoxBodySummary>
        </header>

        <LinkNew
          href={"/docs/redis"}
          className="mt-auto justify-between"
          type="button"
        >
          Read the docs
        </LinkNew>
      </BorderBoxBody>
    </BorderBox>
  );
}
