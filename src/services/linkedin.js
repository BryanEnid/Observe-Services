const axios = require('axios');
const config = require('config');

const {
  apiUrl, clientId, clientSecret, redirectUrl
} = config.get('linkedin');

/**
 * @param {String} code
 * @return {Promise<{
 *   access_token: String;
 *   expires_in: Number;
 *   scope: String;
 *   token_type: String;
 *   id_token: String;
 * }>}
 */
const getAccessToken = async (code) => {
  const params = {
    code,
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUrl,
  };

  const { data } = await axios.get(`${apiUrl}/oauth/v2/accessToken`, {
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  return data;
};

/**
 * @param {String} token
 * @return {Promise<{
 *   sub: String;
 *   email_verified: String;
 *   name: String;
 *   locale: { country: String; language: String };
 *   given_name: String;
 *   family_name: String;
 *   email: String;
 *   picture: String;
 * }>}
 */
const getUserInfo = async (token) => {
  const { data } = await axios.get(`${apiUrl}/v2/userinfo`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return data;
};

module.exports = { getAccessToken, getUserInfo };
