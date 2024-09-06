import React from "react";
import mainImage from "../../assets/main-page/main-image.jpg";
import eclipse01 from "../../assets/main-page/Ellipse 1.png";
import eclipse02 from "../../assets/main-page/Ellipse 2.png";
import eclipse03 from "../../assets/main-page/Ellipse 3.png";
import eclipse04 from "../../assets/main-page/Ellipse 4.png";
import { useNavigate } from "react-router";

function MainPage() {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/auth/home");
  }
  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#202020] h-screen w-full relative pb-20 pt-20">
        <p className="text-[#fff] text-[37px] inter-font font-extrabold mb-2 md:text-[46px] lg:text-[54px] xl:text-[64px] relative z-10">
          Create more
          <span
            style={{
              background: "linear-gradient(to right, #bf2d8e, #3362f0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="inter-font font-extrabold px-3"
          >
            MEME
          </span>
          in less time
        </p>
        <p className="text-[#fff] text-[11px] inter-font font-normal mb-12 md:text-[14px] lg:text-[17px] xl:text-[20px] relative z-10">
          Create and share memes instantly with MemeMaster! Choose from
          templates or upload your own images. <br /> Perfect for beginners and
          pros. Start creating and join the meme revolution!
        </p>

        {/* eclipse vectors */}

        <div className="absolute top-[40px] right-0">
          <img
            src={eclipse01}
            alt="eclipse01 image"
            className="w-[80px] md:w-[100px] lg:w-[118px] xl:w-[140px] "
          />
        </div>

        <div className="absolute bottom-[214px] right-[46px] md:bottom-[247px] md:right-[42px] lg:bottom-[330px] lg:right-[38px] xl:right-[156px] 2xl:right-[475px]">
          <img
            src={eclipse03}
            alt="eclipse03 image"
            className="w-[34px] md:w-[42px] lg:w-[50px] xl:w-[60px]"
          />
        </div>

        <div className="absolute top-[60px] left-0">
          <img
            src={eclipse03}
            alt="eclipse03 image"
            className="w-[34px] md:w-[42px] lg:w-[50px] xl:w-[60px]"
          />
        </div>

        {/* Parent container for mainImage and eclipse04 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute bottom-[-175px] left-[30px] xl:left-[86px] 2xl:left-[213px]">
            <img
              src={eclipse04}
              alt="eclipse04 image"
              className="w-[114px] md:w-[142px] lg:w-[168px] xl:w-[200px]"
            />
          </div>

          <div className="z-10">
            <div className="relative">
              <img
                src={mainImage}
                alt="main image"
                className=" w-[480px] md:w-[600px] lg:w-[850px]"
              />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-[#cf2786] to-[#3b3cc9] w-max rounded-[5px] px-8 py-1  cursor-pointer" onClick={goToHome}>
                  <p className="inter-font text-[11px] font-extrabold text-[#fff] md:text-[14px] lg:text-[17px] xl:text-[20px]">
                    Connect Wallet
                  </p>
                </div>
                <div>
                  <p className="text-white text-[10px] font-normal pt-2 md:text-[12px] lg:text-[14px] xl:text-[16px]">
                    Create and Share Memes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
