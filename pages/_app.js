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
}
