import { useEffect, useRef, useState } from "react";

export default function Camera() {
    const videoRef = useRef(null);
    const [deviceId, setDeviceId] = useState(""); // 선택된 장치 ID

    useEffect(() => {
        const initCamera = async () => {
            try {
                // 카메라 목록 가져오기
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === "videoinput");

                if (videoDevices.length > 0) {
                    // 외부 카메라(첫 번째 외부 카메라) 선택
                    const externalCamera = videoDevices.find(device => !device.label.includes("integrated")) || videoDevices[0];
                    setDeviceId(externalCamera.deviceId); // 장치 ID 저장

                    // 외부 카메라로 스트림 요청
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { deviceId: { exact: externalCamera.deviceId } }
                    });

                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } else {
                    alert("사용 가능한 카메라가 없습니다.");
                }
            } catch (error) {
                console.error("Camera initialization failed:", error);
                alert("카메라를 활성화할 수 없습니다. 권한을 확인하세요.");
            }
        };

        initCamera();
    }, []);
    
    return (
        <div style={{width:"100%",  height:"auto",width:"35rem", height:"23.75rem"}}>
            <video ref={videoRef} autoPlay playsInline style={{backgroundColor:"#eee", width:'100%',minWidth:"360px",minHeight:"320px"}} />
        </div>
    )
}