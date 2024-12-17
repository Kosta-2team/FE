import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Html, Head, Main, NextScript } from "next/document";


/*서버에서만 렌더링 됨, html, head,body를 커스텀 마이징*/

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <NavBar />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
