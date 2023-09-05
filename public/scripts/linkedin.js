const PARTNER_ID = "5007892";

function initializeLinkedinInsightTag(w, d, e, v) {
  if (w.lintrk) return;

  w._linkedin_partner_id = PARTNER_ID;
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
  w._linkedin_data_partner_ids.push(w._linkedin_partner_id);

  w.lintrk = function (a, b) {
    w.lintrk.q.push([a, b]);
  };

  w.lintrk.q = [];

  var s = d.getElementsByTagName(e)[0];
  var b = d.createElement(e);

  b.type = "text/javascript";
  b.async = true;
  b.src = v;

  s.parentNode.insertBefore(b, s);
}

initializeLinkedinInsightTag(
  window,
  document,
  "script",
  "https://snap.licdn.com/li.lms-analytics/insight.min.js"
);
