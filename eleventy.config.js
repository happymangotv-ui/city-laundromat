module.exports = function(eleventyConfig) {
  // Passthrough copy admin and static assets as-is (no template processing)
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  // Ignore admin from template processing
  eleventyConfig.ignores.add("src/admin/**");

  // Watch for data changes
  eleventyConfig.addWatchTarget("./_data/");

  // Keep flat .html URLs (e.g. /about.html not /about/)
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // Custom filter for URL encoding (used in Google Maps links)
  eleventyConfig.addFilter("urlencode", (val) => encodeURIComponent(val));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
