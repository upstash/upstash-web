import Container from "@/components/container";
import {
  FastCard,
  FastCardTitle,
  FastCardValue,
} from "@/components/home/fast/card";
import Icon, { ICON_NAMES } from "@/components/icon";
import cx from "@/utils/cx";
import Link from "next/link";

export default function FastStatistic() {
  return (
    <Container className="max-w-screen-lg">
      <div
        className={cx(
          "mx-auto grid grid-cols-2 gap-6 p-6",
          "rounded-2xl bg-white/5 backdrop-blur",
          "md:w-fit md:grid-cols-3 md:gap-16 md:rounded-4xl md:px-12 md:py-6",
        )}
      >
        <FastCard>
          <FastCardValue>25B</FastCardValue>
          <FastCardTitle>REDIS COMMANDS / WEEK</FastCardTitle>
        </FastCard>

        <FastCard>
          <FastCardValue>7.1B</FastCardValue>
          <FastCardTitle>KAFKA MESSAGES / WEEK</FastCardTitle>
        </FastCard>

        <FastCard className="col-span-2 md:col-span-1">
          <FastCardValue>
            <span className="opacity-40">{`>`}</span>99.99%
          </FastCardValue>
          <FastCardTitle>UPTIME</FastCardTitle>
        </FastCard>
      </div>

      {/* test */}
      <p className="mt-6">
        <Link
          href="/fast"
          className="inline-flex items-center gap-1 underline opacity-60 transition hover:opacity-100"
        >
          <Icon icon={ICON_NAMES.Bolt} className="text-2xl" />
          Test the speed
        </Link>
      </p>
    </Container>
  );
}
