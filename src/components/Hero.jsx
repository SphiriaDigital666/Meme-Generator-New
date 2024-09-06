import Hero from "../assets/hero1.png"
import heroImage from "../assets/hero/mobile_hero_image.jpeg.jpg"
import TextLogo from "../assets/newl-01.png"
import "../components/homestyle.css"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Collage from "./collage/collage"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/auth/main")
  }

  return (
    <div className="background-wrapper">
      <Navbar />
      <div className="bg-hero-mobile flex min-h-[550px] flex-col items-center justify-center bg-cover bg-center lg:mt-10 lg:justify-start lg:bg-none">
        <div className="items-center justify-center sm:flex">
          <h1 className="mb-4 hidden text-center text-3xl tracking-wide  sm:mb-0 sm:text-4xl md:text-4xl lg:block lg:text-6xl xl:text-7xl ">
            Create More
          </h1>
          <img
            src={TextLogo}
            className="mx-5 mb-4 w-[200px] sm:mb-0 sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[300px] "
          />
          <h1 className="hidden text-center text-3xl  tracking-wide sm:text-4xl md:text-4xl lg:block lg:text-6xl xl:text-7xl">
            in Less Time!
          </h1>
        </div>

        <p
          className="ml-4 mr-4 mt-6 hidden max-w-full 
  text-center text-base text-neutral-300 
  sm:ml-6 sm:mr-6 sm:mt-8 sm:max-w-2xl sm:text-lg 
  md:ml-8 md:mr-8 md:mt-10 md:max-w-3xl md:text-xl 
  lg:ml-10 lg:mr-10 lg:block lg:max-w-4xl lg:text-2xl 
  xl:ml-12 xl:mr-12 xl:max-w-5xl xl:text-3xl"
        >
          Create and share memes instantly with Memes! Choose from templates or
          upload your own images. Perfect for beginners and pros. Start creating
          and join the meme revolution!
          <footer className="mt-6 border-t border-neutral-700 sm:mt-8 md:mt-10"></footer>
        </p>
        <div className="my-6 flex flex-col items-center justify-center sm:my-8 sm:flex-row md:my-10 lg:my-12 xl:my-14">
          <button
            className="mx-2 rounded-md bg-gradient-to-r from-[#ce2783] to-[#403bc8] px-4 py-2 text-xs sm:mx-4 sm:px-6 sm:py-2 sm:text-sm md:text-base"
            onClick={goToHome}
          >
            Create Memes Now
          </button>
          <a
            href="#"
            className="mt-4 hidden rounded-md border border-neutral-700 px-4 py-2 text-center text-xs sm:mt-0 sm:px-6 sm:text-sm md:text-base lg:block"
          >
            Documentation
          </a>
        </div>
        <div className="mx-2 my-4 mt-10 hidden max-w-[1280px] justify-center bg-gradient-to-r from-[#ce2783]  to-[#403bc8] sm:w-[600px] md:w-[780px] lg:flex lg:w-[900px] xl:w-[1000px] 2xl:w-[1280px]">
          <img className="w-1.2 mx-2 my-4" src={Hero} alt="MEME_Generate" />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HeroSection
