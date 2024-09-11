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

      <div className="hero-background-section-01">
        <div className="mb-12 flex items-center justify-center pt-[110px]">
          <div className="w-max rounded-xl bg-white bg-opacity-20 px-12 py-8 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-center">
              <p className="text-[64px] font-semibold text-white">
                Create more
              </p>

              <img src={memesLogo} alt="meme logo" className="w-[275px] px-4" />

              <p className="text-[64px] font-semibold text-white">
                in less time!
              </p>
            </div>

            <p className="text-center text-[20px] font-normal text-white">
              Create and share memes instantly with Meme! Choose from templates
              or upload your own images.
            </p>
            <p className="text-center text-[20px] font-normal text-white">
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
