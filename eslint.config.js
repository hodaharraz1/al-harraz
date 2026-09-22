import nextConfig from 'eslint-config-next'

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'src/payload-types.ts',
      'src/app/(payload)/admin/importMap.js',
      'src/migrations/**',
    ],
  },
  ...nextConfig,
]

export default config
