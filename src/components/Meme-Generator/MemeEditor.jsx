import memeImageRight from "../../assets/meme-editor-right-img.png"
import TextIcon from "../../assets/textEditor/Lowercase.png"
import TemplateControl from "../MemeTemplates/TemplateControl"
import RowCollage from "../collage/RowCollage"
import Collage from "../collage/collage"
import BackgroundColorPicker from "./BgColorPicker"
import ColorPicker from "./ColorPicker"
import MemeCharacters from "./Features/MemeSideBar/MemeCharacter"
import TextEditor from "./Features/MemeSideBar/TextEditor"
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
        <div
          className={`${selectedImage ? "container123 py-2" : ""}  bg-[#47464b] ${selectedImage ? "show-right-section" : ""}`}
        >
          {/* sidebar1 */}
          {selectedImage && (
            <div className="right-section my-6 ml-4 rounded-lg bg-[#16151a]">
              {selectedImage && selectedTextId ? (
                <div className="flex h-20 w-full flex-row items-center justify-between p-4">
                  <button className="go-back" onClick={goBack}>
                    <MdArrowBackIos className="text-[30px]" />
                  </button>
                  <img
                    src={TextIcon}
                    alt="My Image"
                    className="w-5 translate-y-[1px] md:w-6 lg:w-7 xl:w-8 xl:translate-y-[2px] 2xl:w-9"
                  />
                  <p className="pr-3 text-[13px] leading-none text-white md:text-[14px] lg:text-[15px] xl:text-[16px]">
                    Text Editor
                  </p>
                </div>
              ) : (
                <p className="text-center">
                  Pick a Meme Template to Start Editing Your Meme.
                </p>
              )}
              <div className="flex">
                {selectedImage && selectedTextId !== null && (
                  <div className="w-full">
                    <div className=" border-b border-t border-[#535353] px-4 py-4">
                      <TextEditor
                        text={texts.find((text) => text.id === selectedTextId)}
                        onTextChange={handleTextChange}
                        onAddText={handleAddText}
                        onDeleteText={handleDeleteText}
                        onToggleBold={handleToggleBold}
                        onToggleItalic={handleToggleItalic}
                        onToggleUnderline={handleToggleUnderline}
                        isAddDisabled={texts.length >= 4}
                      />
                    </div>

                    <h3 className="mb-2 pl-3 pt-3 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
                      Select Text Color
                    </h3>
                    <div className="flex items-center justify-center border-b border-[#535353] px-4 py-4">
                      <ColorPicker
                        currentColor={currentColor}
                        onColorChange={handleColorChange}
                      />
                    </div>

                    <h3 className="mb-2 pl-3 pt-3 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
                      Select Font Style
                    </h3>
                    <div className="flex items-center justify-center border-b border-[#535353] px-4 py-4">
                      <FontSelector
                        currentFontFamily={
                          texts.find((text) => text.id === selectedTextId)
                            ?.fontFamily
                        }
                        onFontFamilyChange={handleFontFamilyChange}
                      />
                    </div>

                    <h3 className="mb-2 pl-3 pt-3 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
                      Select Font Size
                    </h3>
                    <div className="flex items-center justify-center border-b border-[#535353] px-4 py-4">
                      <FontSizeSelector
                        currentSize={
                          texts.find((text) => text.id === selectedTextId)
                            ?.fontSize
                        }
                        onSizeChange={handleFontSizeChange}
                      />
                    </div>

                    <h3 className="mb-2 pl-3 pt-3 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
                      Background Color
                    </h3>
                    <div className="flex items-center justify-center border-b border-[#535353] px-4 py-4">
                      <BackgroundColorPicker
                        currentColor={backgroundColor}
                        onColorChange={handleBackgroundColorChange}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-center space-y-4 sm:mt-8 sm:flex-col sm:space-y-6">
                      <div>
                        <button
                          className="mx-auto flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#5f5f5f] py-2 text-[12px] text-white transition-colors hover:bg-[#4e4e4e] md:w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[160px]"
                          onClick={() => setSelectedImage(null)} // Option to clear the image
                        >
                          {/* <MdImage /> */}
                          Change Image
                        </button>
                      </div>
                      <div>
                        <button
                          className="mx-auto mb-3 flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#8B84EE] py-2 text-[12px] text-white transition-colors hover:bg-[#8bb11b] disabled:bg-gray-400 md:w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[160px]"
                          onClick={handleDownloadMeme}
                          disabled={!selectedImage}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
          >
            <div>
              {/* {selectedImage && selectedTextId ? (
                <div className="ml-4 mt-4 flex items-center">
                  <div className="flex flex-row justify-center text-white md:font-normal">
                    <h1 className="mb-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      Meme Template
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-center text-white md:font-normal">
                  <h1 className="mb-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    Meme Templates
                  </h1>
                </div>
              )} */}

              <div className="relative px-[40px]">
                <div ref={memeRef} className="relative inline-block">
                  {selectedImage ? (
                    <>
                      <div className="flex items-center justify-center">
                        <img
                          src={selectedImage}
                          alt="Meme"
                          style={{ backgroundColor: backgroundColor }}
                          className="background-image-div-1 h-auto w-auto"
                        />
                      </div>
                      <StickerEditor
                        stickers={stickers}
                        selectedStickerId={selectedStickerId}
                        handleStickerDrag={handleStickerDrag}
                        handleStickerResize={handleStickerResize}
                        handleStickerRotate={handleStickerRotate}
                        handleDeleteSticker={handleDeleteSticker}
                        handleSelectSticker={handleSelectSticker}
                      />
                      <TextEditors
                        texts={texts}
                        selectedTextId={selectedTextId}
                        handleSelectText={handleSelectText}
                        setTexts={setTexts}
                      />
                    </>
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
                              <ImageSelector
                                onImageSelect={handleImageSelect}
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
                {/* {selectedImage && selectedTextId ? (
                  <div> </div>
                ) : (
                  <div className="mt-16">
                    <Link to="/auth/home" className="text-[75px] text-[#456]">
                      <RowCollage />
                    </Link>
                  </div>
                )} */}

                {selectedImage && selectedTextId !== null && (
                  <div className="w-full">
                    <div className="mb-6 mt-4 flex flex-col items-center justify-center">
                      <div className="block sm:hidden">
                        <button
                          className="mx-3 mt-4 flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#5f5f5f] py-2 text-[10px] leading-none text-white md:w-[110px] md:text-[11px] lg:mx-0 lg:w-[120px] lg:text-[12px] xl:w-[130px] xl:text-[13px] 2xl:w-[150px] 2xl:text-[14px]"
                          onClick={() => setSelectedImage(null)} // Option to clear the image
                        >
                          <MdImage className="-translate-y-[1px]" />
                          Change Image
                        </button>
                      </div>

                      <div className="block sm:hidden">
                        <button
                          className="mx-3 mt-4 flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#8B84EE] py-2 text-[10px] leading-none text-white md:w-[110px] md:text-[11px] lg:mx-0 lg:w-[120px] lg:text-[12px] xl:w-[130px] xl:text-[13px] 2xl:w-[150px] 2xl:text-[14px]"
                          onClick={handleDownloadMeme}
                          disabled={!selectedImage}
                        >
                          <MdDownloadForOffline />
                          Download
                        </button>
                      </div>
                    </div>
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
