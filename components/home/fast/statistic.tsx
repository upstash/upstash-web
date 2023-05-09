import {
  FastCard,
  FastCardTitle,
  FastCardValue,
} from "@/components/home/fast/card";

export default function FastStatistic() {
  return (
    <div className="grid grid-cols-3 rounded-[2.2rem] bg-white/5 px-6 py-4 backdrop-blur md:p-6">
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
