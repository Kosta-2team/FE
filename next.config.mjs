import 'dotenv/config'; // 환경변수 로드

export default {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://192.168.0.18:7003/:path*", // C# API 서버로 프록시
            },
        ];
    },
    env: {
      NEXTAUTH_URL : process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET,
      MONGODB_URI: process.env.MONGODB_URI,
      NEXT_PUBLIC_APIURL: process.env.NEXT_PUBLIC_APIURL || "192.168.0.18",
      NEXT_PUBLIC_APIPORT: process.env.NEXT_PUBLIC_APIPORT || "7003",
      ISDEV: process.env.ISDEV || "true",
    },
};


