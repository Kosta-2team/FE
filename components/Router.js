import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Router = () => {
    const router = useRouter();
    
    
    useEffect(()=> {

        const hasAuthCookie = document.cookie.split(';').find((key)=>key.startsWith('next-auth.session-token='));

         

        if(router.pathname === "/"){

            if(hasAuthCookie) {
                router.replace('/dashboard');
            }
            else{
                router.replace("/Login");
                }
            }

            
           
    },[router]);

    return null;

    
}

export default Router;