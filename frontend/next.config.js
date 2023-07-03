/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	ignoreBuildErrors: true,

	eslint: {
		ignoreDuringBuilds: true,
	},

	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
