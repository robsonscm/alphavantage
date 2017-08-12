'use strict';

require('dotenv').config();
const apiKey = 'AV_KEY';

/**
 * The Alpha Vantage core module.
 */
module.exports = config => {
  config = Object.assign({}, { key: process.env[apiKey] }, config);

  // Check for config errors.
  let errors = [];
  ['key'].forEach(prop => {
    if (config[prop] === undefined) {
      errors.push(prop);
    }
  });
  if (errors.length) {
    throw new Error(`Missing Alpha Vantage config settings: ${errors.join(', ')}`);
  }

  // Add the base url for submodules to use.
  config.base = `https://www.alphavantage.co/query?apikey=${config.key}&`;

  // Include all the submodules.
  return {
    data: require('./lib/data')(config),
    performance: require('./lib/performance')(config)
  };
};
