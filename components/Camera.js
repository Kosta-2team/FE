import { useState, useEffect, useRef } from "react";

export default function Camera() {
    const videoRef = useRef(null);

    useEffect(()=> {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({video:true});
                if(videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                if(videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

            }catch (error) {
                console.error("Camera initialization failed:",error);
            }
        };
    },[]);

    return (
        <div tyle={{width:"100%",  height:"auto", width:"720px", height:"480px",minwidth:"360px", minheight:"240px"}}>
            <video ref={videoRef} autoPlay playsInline style={{backgroundColor:"#eee"}} />
        </div>
    )
}