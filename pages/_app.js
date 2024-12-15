<<<<<<< HEAD
<<<<<<< HEAD
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import '../styles/reset.css';
import "@/styles/globals.css";



/*공통 컴포넌트 레이아웃*/
export default function App({ Component, pageProps }) {
  return (<>
  <NavBar />
  <Component {...pageProps}/>
  <Footer /> 
  </>);
=======
=======
>>>>>>> 8fd885e573d1a6c5d845626df53f7ff6f0f75e70
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
<<<<<<< HEAD
>>>>>>> 8fd885e573d1a6c5d845626df53f7ff6f0f75e70
=======
>>>>>>> 8fd885e573d1a6c5d845626df53f7ff6f0f75e70
}
