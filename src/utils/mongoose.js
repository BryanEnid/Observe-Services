/**
 * @param obj
 * @param {String?} prefix
 * @param {String[]?} exclude
 * @return {{ [key: String]: any }}
 */
const getPartialObj = (obj, prefix = '', exclude = []) => Object.keys(obj).reduce((acc, key) => {
  if (!exclude.includes(key)) {
    acc[`${prefix}${key}`] = obj[key];
  }

  return acc;
}, {});

module.exports = {
  getPartialObj,
};
