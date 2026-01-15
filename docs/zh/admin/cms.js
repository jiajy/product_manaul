/* Decap CMS: make preview closer to the actual MkDocs site */
(function () {
  if (!window.CMS) return;

  // Load site CSS into preview iframe (in addition to config.yml preview_styles)
  try {
    window.CMS.registerPreviewStyle("/stylesheets/extra.css");
  } catch (e) {
    // ignore
  }

  // Make common utility classes work even if preview doesn't have `.md-typeset`
  window.CMS.registerPreviewStyle(
    `
      /* mimic Material content typography container */
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Noto Sans", "Liberation Sans", sans-serif; }
      `,
    { raw: true }
  );
})();

