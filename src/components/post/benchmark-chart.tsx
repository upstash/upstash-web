import styles from "./benchmark-chart.module.css";

type Comparison = {
  label: string;
  docs7: number;
  mintlify: number;
  detail: string;
};

export function BenchmarkChart({
  title,
  description,
  unit,
  rows,
}: {
  title: string;
  description: string;
  unit: "score" | "ms" | "s";
  rows: Comparison[];
}) {
  const maximum =
    unit === "score"
      ? 100
      : Math.max(1, ...rows.flatMap((row) => [row.docs7, row.mintlify]));
  const suffix = unit === "score" ? "" : ` ${unit}`;

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
        <span className={styles.description}>
          {unit === "score"
            ? "Score out of 100. Higher is better."
            : `Time in ${unit}. Lower is better.`}
        </span>
      </figcaption>
      <div className={styles.grid}>
        {rows.map((row) => (
          <div key={row.label}>
            <div className={styles.label}>{row.label}</div>
            <dl className={styles.values}>
              <div className={styles.value}>
                <dt>Docs7</dt>
                <dd>
                  <span className={styles.track} aria-hidden="true">
                    <span
                      className={styles.docs7}
                      style={{ width: `${(row.docs7 / maximum) * 100}%` }}
                    />
                  </span>
                  <span>
                    {row.docs7}
                    {suffix}
                  </span>
                </dd>
              </div>
              <div className={styles.value}>
                <dt>Mintlify</dt>
                <dd>
                  <span className={styles.track} aria-hidden="true">
                    <span
                      className={styles.mintlify}
                      style={{ width: `${(row.mintlify / maximum) * 100}%` }}
                    />
                  </span>
                  <span>
                    {row.mintlify}
                    {suffix}
                  </span>
                </dd>
              </div>
            </dl>
            <div className={styles.detail}>{row.detail}</div>
          </div>
        ))}
      </div>
    </figure>
  );
}
