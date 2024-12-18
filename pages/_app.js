import { SessionProvider } from 'next-auth/react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import '../styles/reset.css';
import Router from '../components/Router';
import Link from 'next/link';

//Navbar 숨겨야되는 경로: 로그인 관련 페이지에서 숨김
const hiddenNavPath = ["/Login","/signup","/ForgotPassword","/ResetPassword"]

//현재 경로가 숨겨야되는 경로에 해당하는가?
const isHiddenNav = hiddenNavPath.includes(Router.pathname);



export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Router />
      {!isHiddenNav && <NavBar />}
      <Component {...pageProps} />
      <Footer /> 
    </SessionProvider>
  );
}
