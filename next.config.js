const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'logmagns07',
        mongodb_password: 'enpMKf9FHnqRIBVF',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'blog-dev',
      },
    };
  } else if (
    phase === PHASE_PRODUCTION_SERVER ||
    phase === PHASE_PRODUCTION_BUILD
  ) {
    return {
      env: {
        mongodb_username: 'logmagns07',
        mongodb_password: 'enpMKf9FHnqRIBVF',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'blog',
      },
    };
  } else {
    return {};
  }
};

module.exports = nextConfig;
