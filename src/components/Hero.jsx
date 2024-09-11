import memesLogo from "../assets/hero/memeLogo.png"
import Footer from "./Footer"
import "./Hero.css"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/auth/main")
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="hero-background-section-01 px-3">
        <div className="mb-12 flex items-center justify-center pt-[110px]">
          <div className="w-max rounded-xl bg-white bg-opacity-20 px-12 py-8 backdrop-blur-xl">
            <div className="mb-4 items-center justify-center sm:flex">
              <p className="text-center text-[30px] font-semibold text-white sm:text-[35px] md:text-[35px] lg:text-[45px] xl:text-[55px] 2xl:text-[64px]">
                Create more
              </p>

              <div className="flex items-center justify-center">
                <img
                  src={memesLogo}
                  alt="meme logo"
                  className="w-[150px] px-4 sm:w-[150px] md:w-[190px] lg:w-[205px] xl:w-[235px] 2xl:w-[275px]"
                />
              </div>

              <p className="text-center text-[30px] font-semibold text-white sm:text-[35px] md:text-[35px] lg:text-[45px] xl:text-[55px] 2xl:text-[64px]">
                in less time!
              </p>
            </div>

            <p className="mb-4 text-center text-[15px] font-normal text-white sm:mb-0 sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
              Create and share memes instantly with Meme! Choose from templates
              or upload your own images.
            </p>
            <p className="text-center text-[15px]  font-normal text-white sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
              Perfect for beginners and pros. Start creating and join the meme
              revolution!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="w-max cursor-pointer rounded-sm bg-gradient-to-r from-[#cf2784] to-[#363cca] px-4 py-2"
            onClick={goToHome}
          >
            <p>Create Memes Now</p>
          </div>
        </div>
      </div>

      <div className="hero-background-section-02"></div>

      <div className="hero-background-section-03"></div>
      <Footer />
    </div>
  )
}

export default HeroSection
