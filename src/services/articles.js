const axios = require('axios');
const { JSDOM } = require('jsdom');

const wordsPerMinute = 265;

/**
 *
 * @param {String} text
 * @return String
 */
const calcReadingTime = (text) => {
  const words = text.split(' ');
  return `PT${Math.ceil(words.length / wordsPerMinute)}M`;
};

/**
 * @param {String} url
 * @return {Promise<{ title: String, description: String, readingTime: String, preview: String }>}
 */
const getArticleMeta = async (url) => {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);

  const title = dom.window.document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const description = dom.window.document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const picture = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const articleEl = dom.window.document.querySelector('article');
  let readingTime = '';
  if (articleEl) {
    readingTime = calcReadingTime(articleEl.textContent);
  }

  return {
    title, description, readingTime, picture,
  };
};

module.exports = { getArticleMeta };
