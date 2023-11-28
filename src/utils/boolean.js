/**
 *
 * @param {String | Boolean} val
 * @return {Boolean}
 */
const castToBoolean = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }

  return !!val && val === 'true';
};

module.exports = { castToBoolean };
