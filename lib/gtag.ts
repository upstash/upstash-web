export const pageview = (url) => {
  // @ts-ignore
  window.gtag("config", "G-QW5KRSTDM0", {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  // @ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
