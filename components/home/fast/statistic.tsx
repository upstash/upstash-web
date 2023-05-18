import {
  FastCard,
  FastCardTitle,
  FastCardValue,
} from "@/components/home/fast/card";

export default function FastStatistic() {
  return (
    <div
      className="mx-auto grid w-fit grid-cols-3 gap-4 rounded-2xl bg-white/5
    px-6 py-4 backdrop-blur md:gap-16 md:rounded-4xl md:px-12 md:py-6"
    >
      <FastCard>
        <FastCardValue>8.3B</FastCardValue>
        <FastCardTitle>REDIS COMMANDS / WEEK</FastCardTitle>
      </FastCard>

      <FastCard>
        <FastCardValue>7.1B</FastCardValue>
        <FastCardTitle>KAFKA MESSAGES / WEEK</FastCardTitle>
      </FastCard>

      <FastCard>
        <FastCardValue>
          <span className="opacity-40">{`>`}</span>99.99%
        </FastCardValue>
        <FastCardTitle>UPTIME</FastCardTitle>
      </FastCard>
    </div>
  );
}
