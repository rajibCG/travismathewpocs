/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.travismathew.com',
            },
        ],
    },
}

module.exports = nextConfig
