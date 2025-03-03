import {
  FastCard,
  FastCardTitle,
  FastCardValue,
} from "@/components/home/fast/card";
import cx from "@/utils/cx";

export default function FastStatistic() {
  return (
    <>
      {/* test */}
      {/*<p className="mb-6">*/}
      {/*  <Link href="/fast" className="text-primary underline">*/}
      {/*    Test the speed {`->`}*/}
      {/*  </Link>*/}
      {/*</p>*/}

      <div
        className={cx(
          "grid grid-cols-2 items-center gap-4 p-6 shadow-md md:grid-cols-4",
          "rounded-2xl bg-bg backdrop-blur dark:bg-bg-mute",
          "md:gap-12 md:rounded-4xl md:px-12 md:py-6",
        )}
      >
        <FastCard>
          <FastCardValue>40B</FastCardValue>
          <FastCardTitle>Redis Commands</FastCardTitle>
        </FastCard>

        <FastCard>
          <FastCardValue>90M</FastCardValue>
          <FastCardTitle>QStash Messages</FastCardTitle>
        </FastCard>

        <FastCard>
          <FastCardValue>8M</FastCardValue>
          <FastCardTitle>Vector Queries</FastCardTitle>
        </FastCard>

        <FastCard>
          <FastCardValue>{`>`}99.99%</FastCardValue>
          <FastCardTitle>Uptime</FastCardTitle>
        </FastCard>
      </div>
    </>
  );
}
