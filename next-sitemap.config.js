/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://example.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/api/*'],
};