import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Camera from "@/components/Camera";
import ParkingTableC2 from "@/components/ParkingTableC2";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { isJSON } = useGlobalContext();

  // 초기값 설정 함수
  const getInitialData = () => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("selectedData");
      if (storedData && isJSON(storedData)) {
        try {
          const parsedData = JSON.parse(storedData);
          return parsedData.numPlate || "";
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
          return "";
        }
      }
    }
    return "";
  };

  const [selectedData, setSelectData] = useState("");

  // 컴포넌트가 마운트된 후 초기 데이터 설정
  useEffect(() => {
    const initialData = getInitialData();
    setSelectData(initialData);
  }, []);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectData(value);

    try {
      const storedData = localStorage.getItem("selectedData");
      const parsedData = storedData ? JSON.parse(storedData) : {};
      parsedData.numPlate = value;
      localStorage.setItem("selectedData", JSON.stringify(parsedData));
      console.log("업데이트된 로컬 스토리지 데이터:", parsedData);
    } catch (error) {
      console.error("로컬 스토리지 업데이트 중 에러:", error);
    }
  };

  // 테이블 데이터 클릭 처리
  const handleRowClick = (rowData) => {
    setSelectData(rowData.numPlate);
    localStorage.setItem("selectedData", JSON.stringify(rowData));
  };

  const JsonFileUpdate = async () => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("selectedData");
      if (!storedData) {
        console.log("로컬 스토리지에 데이터가 없습니다.");
        return;
      }

      try {
        const parsedData = JSON.parse(storedData);

        const response = await fetch("/api/DataModify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        });

        if (response.ok) {
          console.log("업데이트 성공:", await response.json());
          localStorage.removeItem("selectedData");
          setSelectData("");
          router.push("/dashboard");
        } else {
          console.error("업데이트 실패:", await response.text());
        }
      } catch (error) {
        console.error("JsonFileUpdate 에러:", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta
          name="description"
          content="Dashboard Parking Car program by team.OneGPT"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" alt="탭 아이콘" />
      </Head>
      <div
        className="contextContainer"
        style={{ width: "100vw", height: "90vh" }}
      >
        <div
          className="contextWrapper"
          style={{ width: "100vw", height: "70vh", padding: "100px" }}
        >
          <h1
            style={{
              fontWeight: "600",
              fontSize: "20px",
              paddingLeft: "9.8rem",
            }}
          >
            One Start Parking Center
          </h1>
          <div
            className="contextBox"
            style={{ display: "flex", padding: "10px 10px" }}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Camera />
            </div>

            <div style={{ flex: 1, padding: "10px" }}>
              <ParkingTableC2 onRowClick={handleRowClick} />
              <div
                className="carNumberInputWrapper"
                style={{ display: "flex", paddingTop: "5.3rem" }}
              >
                <input
                  type="text"
                  value={selectedData}
                  onChange={handleInputChange}
                  className="inputbox"
                  placeholder="차 번호를 선택하거나 입력하세요"
                  style={{
                    flex: "3",
                    maxWidth: "300px",
                    padding: "8px",
                    border: 0,
                    borderBottom: "1px solid #000",
                  }}
                />
                <input
                  type="submit"
                  value="입력"
                  onClick={JsonFileUpdate}
                  style={{
                    flex: "1",
                    maxWidth: "70px",
                    margin: "0px 0px 0px 25px",
                    borderRadius: "5px",
                    border: 0,
                    backgroundColor: "#0D1821",
                    color: "#f5f5f5",
                    minWidth: "45px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
