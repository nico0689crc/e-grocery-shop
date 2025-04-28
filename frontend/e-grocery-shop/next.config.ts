import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|es|front-pages|favicon.ico)\\b)):path',
        destination: '/en/:path',
        permanent: true,
        locale: false
      }
    ]
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
export default withNextIntl(nextConfig);