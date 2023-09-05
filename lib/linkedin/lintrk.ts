const PARTNER_ID = "5007892";

export const event = (conversionId: number) => {
  console.log(`EVENT: ${conversionId}`);
  (window as any).lintrk("track", { conversion_id: conversionId });
};
