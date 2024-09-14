import memeImageRight from "../../assets/meme-editor-right-img.png"
import TemplateControl from "../MemeTemplates/TemplateControl"
import RowCollage from "../collage/RowCollage"
import Collage from "../collage/collage"
import canvasImg from "./../../assets/icons/canvasImage.png"
import BackgroundColorPicker from "./BgColorPicker"
import ColorPicker from "./ColorPicker"
import MainCanvas from "./Features/MemeSideBar/MainCanvas"
import MemeCharacters from "./Features/MemeSideBar/MemeCharacter"
import MemeCharactersMobile from "./Features/MemeSideBar/MemeCharacterMobile"
import TextEditor from "./Features/MemeSideBar/TextEditor"
import TextEditorSection from "./Features/MemeSideBar/TextEditorSection"
import TextEditorSectionMobile from "./Features/MemeSideBar/TextEditorSectionMobile"
import StickerEditor from "./Features/Sticker/StickerEditor"
import TextEditors from "./Features/Text/TextsEditor"
import FontSelector from "./FontSelector"
import FontSizeSelector from "./FontSizeSelector"
import ImageSelector from "./ImageSelector"
import PreDefinedTemplates from "./Pre-Defined-Templates"
import UpdateCustomImage from "./UpdateCustomImage"
import "./memeEditor.css"
import store from "@/redux/store"
import html2canvas from "html2canvas"
import React, { useState, useRef, useEffect } from "react"
import Draggable from "react-draggable"
import { MdArrowBackIos, MdDownloadForOffline, MdImage } from "react-icons/md"
import { Provider } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const MainPage = () => {
  const navigate = useNavigate()

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageSelect = (image) => {
    navigate("/auth/meme", { state: { selectedImageInRoute: image } })
  }

  return (
    <div className="overflow-hidden">
      <Provider store={store}>
        <div className="main-container">
          {/* main-body */}
          <div
            className="main-container middle-section mx-0 flex items-center justify-center rounded-lg bg-gray-500"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="">
              <div className="relative sm:py-0">
                <div className="gradient-div mx-2 my-0 mb-4 flex items-center justify-center px-4 py-6 shadow-md drop-shadow-md backdrop-blur-[8px] sm:mx-12 sm:my-8 sm:p-10">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="bg border-indigo-500 lg:col-span-8">
                      <div>
                        {/* Background Templates */}
                        <p className="mb-2 mt-8 font-semibold text-[#fff] sm:mb-5 sm:text-[22px] md:text-[23px] xl:text-[25px]">
                          Custom Background Templates
                        </p>
                        <div className="relative z-30 rounded-xl bg-[#fff] bg-opacity-50 px-2 py-2 shadow-md drop-shadow-md 2xl:py-5">
                          <ImageSelector
                            handleImageSelect={handleImageSelect}
                          />
                        </div>

                        {/* Pre defined meme templates */}
                        <p className="mb-2 mt-8 font-semibold text-[#fff] sm:mb-5 sm:text-[22px] md:text-[23px] xl:text-[25px]">
                          Meme Templates
                        </p>
                        <div className="mx-auto rounded-xl bg-[#fff] bg-opacity-50 px-4 py-4 shadow-md drop-shadow-md lg:py-6 xl:py-10">
                          <PreDefinedTemplates
                            onImageSelect={handleImageSelect}
                          />
                        </div>

                        {/* Collage Section */}
                        <p className="mb-2 mt-8 font-semibold text-[#fff] sm:mb-5 sm:text-[22px] md:text-[23px] xl:text-[25px]">
                          Collage
                        </p>
                        <div className="relative z-10 rounded-xl bg-[#fff] bg-opacity-50 px-2 py-2 shadow-md drop-shadow-md 2xl:py-5">
                          <Link
                            to="/auth/home"
                            className="text-[75px] text-[#456]"
                          >
                            <RowCollage />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="relative order-first flex items-center justify-center border-b-2 pb-[40px] lg:order-none lg:col-span-4 lg:justify-around lg:border-b-0 lg:pb-0">
                      <div className="z-50 hidden h-full w-0.5 bg-white lg:block"></div>
                      <img
                        src={memeImageRight}
                        className="w-[80%] max-w-[330px]"
                        // className="w-full max-w-[330px] lg:w-4/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </div>
  )
}

export default MainPage
