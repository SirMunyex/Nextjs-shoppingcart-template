module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/1',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/home/1',
        permanent: true,
      }
    ]
  },
}
