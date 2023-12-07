const axios = require('axios');
const { JSDOM } = require('jsdom');

/**
 * @param {String} url
 * @return {Promise<{ title: String, description: String, duration: String, preview: String }>}
 */
const getYoutubeVideoMeta = async (url) => {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);

  const title = dom.window.document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const description = dom.window.document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const duration = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const preview = dom.window.document.querySelector('meta[itemProp="duration"]')?.getAttribute('content') || '';

  return {
    title, description, duration, preview,
  };
};

module.exports = { getYoutubeVideoMeta };
