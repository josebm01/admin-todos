/** @type {import('next').NextConfig} */
const nextConfig = {
    // aceptando imágenes de otros destinos
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailus.io'
            }
        ]
    }
};

export default nextConfig;
