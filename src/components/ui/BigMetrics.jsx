import React from "react";
import { useNavigate } from "react-router-dom";

function BigMetrics({ percent, title, blured }) {
  const navigate = useNavigate();
  let image = "/images/okIcon.png";
  if (percent <= 65 && percent >= 30) {
    image = "/images/normIcon.png";
  } else if (percent < 30) {
    image = "/images/badIcon.png";
  }
  const openFullMetric = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("percent", percent);
    navigate("/fullMetric");
  };
  return (
    <>
      {blured ? (
        <div
          className="relative flex flex-col justify-start items-center w-[144px] rounded-[8px] h-[94px] mt-2"
          style={{ background: "#f2f2f7" }}
          onClick={() => navigate("/payment")}
        >
          <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-[4px] flex justify-center items-center z-10">
            <img
              src="/icons/Clip.svg"
              alt="Lock Icon"
              className="w-[30px] h-[30px]"
            />
          </div>
          <img src={image} alt="" className="w-[60px] ml-[1px] mr-[10px]" />
          <div className="flex flex-col justify-start items-start gap-[0px]">
            <h4
              className="font-sans text-[14px] text-black w-[184px]"
              style={{ lineHeight: "120%" }}
            >
              {title}
            </h4>
          </div>
        </div>
      ) : (
        <div
          onClick={() => openFullMetric()}
          className="flex flex-col justify-center items-center w-[144px] rounded-[10px] h-[94px] mt-2"
          style={{ background: "rgba(118, 118, 128, 0.24)" }}
        >
          <img src={image} alt="" className="w-[47px] ml-[1px] mr-[10px]" />
          <div className="flex flex-col justify-start items-start gap-[0px]">
            <h4
              className="font-sans text-[12px] text-white w-[128px] text-center"
              style={{ lineHeight: "120%" }}
            >
              {title}
            </h4>
          </div>
        </div>
      )}
    </>
  );
}

export default BigMetrics;
