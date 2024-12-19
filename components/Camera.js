import { useEffect, useRef, useState } from "react";

export default function Camera() {
    const videoRef = useRef(null);
    const [deviceId, setDeviceId] = useState(""); // 선택된 장치 ID
    const [error, setError] = useState("")

    useEffect(() => {
        const initializeCamera = async () => {
            let cameraAccessGranted = false;

            try {
                // 권한 요청
                await navigator.mediaDevices.getUserMedia({ video: true });
                cameraAccessGranted = true; // 권한 허용 성공
            } catch (error) {
                console.error("카메라 권한 요청 실패:", error);
            }

            if (!cameraAccessGranted) {
                alert("카메라 권한이 필요합니다. 브라우저 설정에서 허용해주세요.");
                return; // 권한이 없으면 초기화 중단
            }

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
                console.error("카메라 초기화 실패:", error);
                alert("카메라를 활성화할 수 없습니다. 권한을 확인하세요.");
            }
        };

        initializeCamera(); // 초기화 실행
    }, []);
    
    return (
        <div style={{width:"100%",  height:"auto",width:"35rem", height:"23.75rem",padding:'10px'}}>
            <video ref={videoRef} autoPlay playsInline style={{backgroundColor:"#eee", width:'100%',minWidth:"360px",minHeight:"320px"}} />
        </div>
    )
}