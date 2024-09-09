import memeImageRight from "../../assets/meme-editor-right-img.png"
import TemplateControl from "../MemeTemplates/TemplateControl"
import RowCollage from "../collage/RowCollage"
import Collage from "../collage/collage"
import canvasImg from "./../../assets/icons/canvasImage.jpg"
import BackgroundColorPicker from "./BgColorPicker"
import ColorPicker from "./ColorPicker"
import MainCanvas from "./Features/MemeSideBar/MainCanvas"
import MemeCharacters from "./Features/MemeSideBar/MemeCharacter"
import TextEditor from "./Features/MemeSideBar/TextEditor"
import TextEditorSection from "./Features/MemeSideBar/TextEditorSection"
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
import { Link } from "react-router-dom"

const MemeEditor = () => {
  const [texts, setTexts] = useState([])
  const [selectedTextId, setSelectedTextId] = useState(null)
  const [selectedStickerId, setSelectedStickerId] = useState(null)
  const [currentColor, setCurrentColor] = useState("#ffffff")
  const [selectedImage, setSelectedImage] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [stickers, setStickers] = useState([])

  const [rotate, setRotate] = useState(0)

  const memeRef = useRef(null)

  useEffect(() => {
    if (texts.length === 0) {
      handleAddText()
    }
  }, [texts])

  const handleDeleteSticker = (stickerId) => {
    setStickers(stickers.filter((sticker) => sticker.id !== stickerId))
  }

  const handleTextChange = (e) => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId ? { ...text, text: e.target.value } : text,
    )
    setTexts(newTexts)
  }

  const handleColorChange = (color) => {
    setCurrentColor(color.hex)
    const newTexts = texts.map((text) =>
      text.id === selectedTextId ? { ...text, color: color.hex } : text,
    )
    setTexts(newTexts)
  }

  const handleFontFamilyChange = (e) => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? { ...text, fontFamily: e.target.value }
        : text,
    )
    setTexts(newTexts)
  }

  const handleFontSizeChange = (e) => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? { ...text, fontSize: parseInt(e.target.value, 10) }
        : text,
    )
    setTexts(newTexts)
  }

  const handleToggleBold = () => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? {
            ...text,
            fontWeight: text.fontWeight === "bold" ? "normal" : "bold",
          }
        : text,
    )
    setTexts(newTexts)
  }

  const handleToggleItalic = () => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? {
            ...text,
            fontStyle: text.fontStyle === "italic" ? "normal" : "italic",
          }
        : text,
    )
    setTexts(newTexts)
  }

  const handleToggleUnderline = () => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? {
            ...text,
            textDecoration:
              text.textDecoration === "underline" ? "none" : "underline",
          }
        : text,
    )
    setTexts(newTexts)
  }

  const handleAddText = () => {
    if (texts.length < 4) {
      const newId = texts.length + 1
      const newY =
        texts.length === 0
          ? 100
          : texts[texts.length - 1].y + texts[texts.length - 1].fontSize + 10
      setTexts([
        ...texts,
        {
          id: newId,
          text: "",
          x: 100,
          y: newY,
          color: currentColor,
          fontStyle: "normal",
          fontSize: 24,
          fontWeight: "normal",
          textDecoration: "none",
          fontFamily: "Roboto",
        },
      ])
      setSelectedTextId(newId)
    }
  }

  const handleSelectText = (id) => {
    setSelectedTextId(id)
  }
  const handleSelectSticker = (id) => {
    setSelectedStickerId(id)
  }

  const handleDeleteText = () => {
    if (selectedTextId !== null) {
      const newTexts = texts.filter((text) => text.id !== selectedTextId)
      setTexts(newTexts)
      if (newTexts.length > 0) {
        setSelectedTextId(newTexts[0].id)
      } else {
        setSelectedTextId(null)
      }
    }
  }

  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex)
  }

  const handleStickerResize = (stickerId, newWidth, newHeight) => {
    const minSize = 30

    const updatedStickers = stickers.map((sticker) =>
      sticker.id === stickerId
        ? {
            ...sticker,
            width: Math.max(newWidth, minSize),
            height: Math.max(newHeight, minSize),
          }
        : sticker,
    )
    setStickers(updatedStickers)
  }

  const handleStickerRotate = (stickerId, newRotation) => {
    const updatedStickers = stickers.map((sticker) =>
      sticker.id === stickerId
        ? { ...sticker, rotation: newRotation }
        : sticker,
    )
    setStickers(updatedStickers)
  }

  // Handle sticker drag

  const handleStickerDrag = (stickerId, x, y) => {
    const updatedStickers = stickers.map((sticker) =>
      sticker.id === stickerId ? { ...sticker, x, y } : sticker,
    )

    setStickers(updatedStickers)
  }
  const handleImage = (image) => {
    setStickers([
      ...stickers,
      {
        id: Date.now(),
        src: image,
        x: 50,
        y: 50,
        width: 100, // Default width
        height: 100, // Default height
        rotation: 0, // Initial rotation is 0
      },
    ])
  }

  const handleDownloadMeme = () => {
    const closeButtons = document.querySelectorAll(".sticker-close-button")
    closeButtons.forEach((button) => {
      button.style.display = "none"
    })
    const selectedTextElement = document.getElementById(
      `text-${selectedTextId}`,
    )
    selectedTextElement ? (selectedTextElement.style.border = "none") : ""
    const selectedStickerElement = document.getElementById(
      `sticker-${selectedStickerId}`,
    )
    selectedStickerElement ? (selectedStickerElement.style.border = "none") : ""

    // Capture the meme
    html2canvas(memeRef.current).then((canvas) => {
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "meme.png"
      link.click()

      // Restore the dotted border after download
      if (selectedTextElement) {
        selectedTextElement.style.border = "2px dotted #fff"
      }

      // Restore the close buttons after download
      closeButtons.forEach((button) => {
        button.style.display = "block"
      })
    })

    setTimeout(() => {
      goBack() // go main page
    }, 500)
  }

  const goBack = () => {
    window.location.reload()
  }

  return (
    <div>
      <Provider store={store}>
        <div className="flex items-center justify-center">
          <h1 className="my-4 bg-none text-lg md:text-xl lg:text-2xl xl:text-3xl">
            {selectedImage && selectedTextId
              ? "Meme Template"
              : "Meme Templates"}
          </h1>
        </div>
        <div
          className={`${selectedImage ? "container123 py-2" : ""}  bg-[#47464b] ${selectedImage ? "show-right-section" : ""}`}
        >
          {/* sidebar1 */}
          {selectedImage && (
            <TextEditorSection
              texts={texts}
              selectedTextId={selectedTextId}
              currentColor={currentColor}
              backgroundColor={backgroundColor}
              handleTextChange={handleTextChange}
              handleAddText={handleAddText}
              handleDeleteText={handleDeleteText}
              handleToggleBold={handleToggleBold}
              handleToggleItalic={handleToggleItalic}
              handleToggleUnderline={handleToggleUnderline}
              handleColorChange={handleColorChange}
              handleFontFamilyChange={handleFontFamilyChange}
              handleFontSizeChange={handleFontSizeChange}
              handleBackgroundColorChange={handleBackgroundColorChange}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              handleDownloadMeme={handleDownloadMeme}
              goBack={goBack}
            />
          )}

          {/* sidebar2 */}
          {selectedImage && (
            <div className="right-section mx-4 my-6 h-screen w-[200px] rounded-lg bg-[#16151a]">
              {selectedImage && selectedTextId && (
                <MemeCharacters handleImage={handleImage} />
              )}
            </div>
          )}

          {/* main-body */}
          <div
            className={`middle-section flex justify-center   ${selectedImage ? "mx-6 bg-[#212024]" : "main-container mx-0 flex items-center justify-center "}`}
            style={{
              backgroundImage: selectedImage ? `url(${canvasImg})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <div className="relative px-[40px]">
                <div
                  ref={memeRef}
                  className="relative inline-block h-full w-full items-center"
                >
                  {/* <MainCanvas
                    selectedImage={selectedImage}
                    backgroundColor={backgroundColor}
                    stickers={stickers}
                    handleStickerDrag={handleStickerDrag}
                    handleStickerResize={handleStickerResize}
                    handleStickerRotate={handleStickerRotate}
                    handleDeleteSticker={handleDeleteSticker}
                    handleSelectSticker={handleSelectSticker}
                    selectedStickerId={selectedStickerId}
                    texts={texts}
                    selectedTextId={selectedTextId}
                    handleSelectText={handleSelectText}
                    setTexts={setTexts}
                    handleImageSelect={handleImageSelect}
                    handleDownloadMeme={handleDownloadMeme}
                    setSelectedImage={setSelectedImage}
                  /> */}
                </div>
                {selectedImage && selectedTextId ? (
                  <div> </div>
                ) : (
                  <div className="gradient-div my-8 flex items-center justify-center p-10 backdrop-blur-sm">
                    <div class="grid grid-cols-12 gap-8 ">
                      <div className="bg  col-span-8 border-indigo-500">
                        <div>
                          <p className="mb-2 text-[25px] font-semibold text-[#fff]">
                            Collage
                          </p>
                          <div className="rounded-xl bg-[#fff] bg-opacity-50 px-10 py-8 shadow-md drop-shadow-md">
                            <Link
                              to="/auth/home"
                              className="text-[75px] text-[#456]"
                            >
                              <RowCollage />
                            </Link>
                          </div>

                          {/* Meme Templates */}

                          <p className="mb-2 mt-6 text-[25px] font-semibold text-[#fff]">
                            Custom Templates
                          </p>
                          <div className="rounded-xl bg-[#fff] bg-opacity-50 px-10 py-8 shadow-md drop-shadow-md">
                            <MainCanvas
                              selectedImage={selectedImage}
                              backgroundColor={backgroundColor}
                              stickers={stickers}
                              handleStickerDrag={handleStickerDrag}
                              handleStickerResize={handleStickerResize}
                              handleStickerRotate={handleStickerRotate}
                              handleDeleteSticker={handleDeleteSticker}
                              handleSelectSticker={handleSelectSticker}
                              selectedStickerId={selectedStickerId}
                              texts={texts}
                              selectedTextId={selectedTextId}
                              handleSelectText={handleSelectText}
                              setTexts={setTexts}
                              handleImageSelect={handleImageSelect}
                              handleDownloadMeme={handleDownloadMeme}
                              setSelectedImage={setSelectedImage}
                            />
                          </div>

                          {/* Pre defined meme templates */}

                          <p className="mb-2 mt-6 text-[25px] font-semibold text-[#fff]">
                            Meme Templates
                          </p>

                          <div className="w-max rounded-xl bg-[#fff] bg-opacity-50 px-10 py-8 shadow-md drop-shadow-md">
                            {/* <ImageSelector
                            onImageSelect={handleImageSelect}
                          /> */}

                            <PreDefinedTemplates
                              onImageSelect={handleImageSelect}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-4 flex items-center justify-center border-l-2">
                        <img src={memeImageRight} />
                      </div>
                    </div>
                    {/* <UpdateCustomImage onImageSelect={handleImageSelect} /> */}
                    {/* Collage */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </div>
  )
}

export default MemeEditor
