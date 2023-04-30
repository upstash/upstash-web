export function numberFormat(
  value: number,
  options?: Intl.NumberFormatOptions
) {
  return Intl.NumberFormat(undefined, { notation: options?.notation }).format(
    value
  );
}
