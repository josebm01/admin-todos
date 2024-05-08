/** @type {import('next').NextConfig} */
const nextConfig = {
    // aceptando imágenes de otros destinos
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailus.io'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            
        ]
    }
};

export default nextConfig;
