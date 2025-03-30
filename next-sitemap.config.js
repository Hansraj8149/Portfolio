/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://hansrajsaini.vercel.app", // Replace with your domain
  generateRobotsTxt: true, // Generates a robots.txt file
  exclude: ["/admin", "/dashboard"], // Exclude private routes
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
  },
};
