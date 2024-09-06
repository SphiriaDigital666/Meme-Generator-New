import image8 from "../../assets/5.png"
import image1 from "../../assets/image01.png"
import image2 from "../../assets/image02.png"
import image3 from "../../assets/image03.png"
import image4 from "../../assets/image04.png"
import image5 from "../../assets/image05.png"
import image6 from "../../assets/image06.png"
import image7 from "../../assets/image07.png"
import element from "../../assets/sidebar/Apps.png"
import sounds from "../../assets/sidebar/Audio.png"
import crop from "../../assets/sidebar/Crop.png"
import help from "../../assets/sidebar/Help.png"
import image from "../../assets/sidebar/Image File.png"
import media from "../../assets/sidebar/Import.png"
import layers from "../../assets/sidebar/Layers.png"
import text from "../../assets/sidebar/Lowercase (1).png"
import more from "../../assets/sidebar/More.png"
import template from "../../assets/sidebar/Prototype.png"
import TextIcon from "../../assets/textEditor/Lowercase.png"
//////////////////////////
import logo123 from "../../assets/textEditor/collage-pic.png"
import TemplateControl from "../MemeTemplates/TemplateControl"
import RowCollage from "../collage/RowCollage"
import Collage from "../collage/collage"
import BackgroundColorPicker from "./BgColorPicker"
import ColorPicker from "./ColorPicker"
import FontSelector from "./FontSelector"
import FontSizeSelector from "./FontSizeSelector"
import ImageSelector from "./ImageSelector"
import TextEditor from "./TextEditor"
import UpdateCustomImage from "./UpdateCustomImage"
import "./memeEditor.css"
import store from "@/redux/store"
import html2canvas from "html2canvas"
import React, { useState, useRef, useEffect } from "react"
import Draggable from "react-draggable"
import { MdDownloadForOffline, MdImage } from "react-icons/md"
import { Provider } from "react-redux"
import { Link } from "react-router-dom"

const images = [image1, image2, image3, image4, image5, image6, image7, image8]

const MemeEditor = () => {
  const [texts, setTexts] = useState([])
  const [selectedTextId, setSelectedTextId] = useState(null)
  const [currentColor, setCurrentColor] = useState("#ffffff")
  const [selectedImage, setSelectedImage] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [stickers, setStickers] = useState([]) // State to manage stickers

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

  const handleDeleteText = () => {
    if (selectedTextId !== null) {
      setTexts(texts.filter((text) => text.id !== selectedTextId))
      setSelectedTextId(null)
    }
  }

  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex)
  }

  // Handle sticker upload

  const handleStickerUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        setStickers([
          ...stickers,
          {
            id: Date.now(),
            src: event.target.result,
            x: 50,
            y: 50,
            width: 100, // Default width
            height: 100, // Default height
          },
        ])
      }

      reader.readAsDataURL(file)
    }
  }

  const handleStickerResize = (stickerId, newWidth, newHeight) => {
    const updatedStickers = stickers.map((sticker) =>
      sticker.id === stickerId
        ? { ...sticker, width: newWidth, height: newHeight }
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

  const handleDownloadMeme = () => {
    const selectedTextElement = document.getElementById(
      `text-${selectedTextId}`,
    )
    if (selectedTextElement) {
      selectedTextElement.style.border = "none"
    }

    html2canvas(memeRef.current).then((canvas) => {
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "meme.png"
      link.click()

      if (selectedTextElement) {
        selectedTextElement.style.border = "2px dotted #000"
      }
    })
  }

  return (
    <div>
      <Provider store={store}>
        <div
          className={`${selectedImage ? "container123 py-2" : ""}  bg-[#47464b] ${selectedImage ? "show-right-section" : ""}`}
        >
          {selectedImage && (
            <div className="right-section mx-8 my-6 rounded-lg bg-[#16151a]">
              {selectedImage && selectedTextId ? (
                <div className="m-3 mb-[18px] flex w-fit items-end gap-4 lg:mx-auto lg:mb-6 lg:mt-4 lg:w-[120px] xl:w-[130px] xl:gap-6 2xl:w-[150px]">
                  <img
                    src={TextIcon}
                    alt="My Image"
                    className="w-5 translate-y-[1px] md:w-6 lg:w-7 xl:w-8 xl:translate-y-[2px] 2xl:w-9"
                  />
                  <p className="text-[13px] leading-none text-white md:text-[14px] lg:text-[15px] xl:text-[16px]">
                    Text Editor
                  </p>
                </div>
              ) : (
                <p className="p-4 text-center">
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
                    <div className="mt-4 flex flex-col items-center justify-center space-y-4 sm:mt-8 sm:space-y-6">
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
                        {selectedImage && (
                          <div className="mx-auto">
                            {/* Hidden file input */}
                            <input
                              id="fileInput"
                              className="hidden" // or use 'sr-only' if using Tailwind CSS
                              type="file"
                              accept="image/*"
                              onChange={handleStickerUpload}
                            />

                            {/* Custom button */}
                            <label
                              htmlFor="fileInput"
                              className="inline-block w-[100px] cursor-pointer rounded-md bg-[#5f5f5f] py-2 text-center text-[12px] text-white transition-colors hover:bg-[#4e4e4e] md:w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[160px]"
                            >
                              Upload Sticker
                            </label>
                          </div>
                        )}
                      </div>

                      <div>
                        <button
                          className="mx-auto mb-3 flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#8B84EE] py-2 text-[12px] text-white transition-colors hover:bg-[#8bb11b] disabled:bg-gray-400 md:w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[160px]"
                          onClick={handleDownloadMeme}
                          disabled={!selectedImage}
                        >
                          {/* <MdDownloadForOffline /> */}
                          Downloadd
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={`middle-section my-6 flex justify-center rounded-lg  ${selectedImage ? "mx-6 bg-[#212024]" : "mx-0 bg-[#000]"}`}
          >
            <div>
              {selectedImage && selectedTextId ? (
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
              )}

              <div
                style={{
                  position: "relative",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                }}
              >
                <div
                  ref={memeRef}
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {selectedImage ? (
                    <>
                      <div className="flex items-center justify-center">
                        <img
                          src={selectedImage}
                          alt="Meme"
                          style={{
                            width: "auto",
                            height: "auto",
                            backgroundColor: backgroundColor,
                          }}
                          className="background-image-div-1"
                        />
                      </div>

                      {texts.map((text) => (
                        <Draggable
                          key={text.id}
                          defaultPosition={{ x: text.x, y: text.y }}
                          onStop={(e, data) => {
                            const updatedTexts = texts.map((t) =>
                              t.id === text.id
                                ? { ...t, x: data.x, y: data.y }
                                : t,
                            )
                            setTexts(updatedTexts)
                          }}
                        >
                          <div
                            id={`text-${text.id}`}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              color: text.color,
                              fontSize: `${text.fontSize}px`,
                              fontWeight: text.fontWeight,
                              textDecoration: text.textDecoration,
                              fontFamily: text.fontFamily,
                              fontStyle: text.fontStyle, //ch2
                              cursor: "move",
                              border:
                                text.id === selectedTextId
                                  ? "2px dotted #fff"
                                  : "none",
                            }}
                            onClick={() => handleSelectText(text.id)}
                          >
                            {text.text}
                          </div>
                        </Draggable>
                      ))}
                      {stickers.map((sticker) => (
                        <Draggable
                          key={sticker.id}
                          defaultPosition={{ x: sticker.x, y: sticker.y }}
                          onStop={(e, data) =>
                            handleStickerDrag(sticker.id, data.x, data.y)
                          }
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: `${sticker.width}px`,
                              height: `${sticker.height}px`,
                              cursor: "move",
                              overflow: "visible", // Make sure delete button is visible
                            }}
                          >
                            <img
                              src={sticker.src}
                              alt="Sticker"
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                backgroundColor: "red",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDeleteSticker(sticker.id)}
                            >
                              <span
                                style={{ fontSize: "14px", fontWeight: "bold" }}
                              >
                                X
                              </span>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: "15px",
                                height: "15px",
                                cursor: "nwse-resize",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation()
                                const startX = e.clientX
                                const startY = e.clientY
                                const startWidth = sticker.width
                                const startHeight = sticker.height

                                const onMouseMove = (moveEvent) => {
                                  const newWidth =
                                    startWidth + (moveEvent.clientX - startX)
                                  const newHeight =
                                    startHeight + (moveEvent.clientY - startY)
                                  handleStickerResize(
                                    sticker.id,
                                    newWidth,
                                    newHeight,
                                  )
                                }

                                const onMouseUp = () => {
                                  document.removeEventListener(
                                    "mousemove",
                                    onMouseMove,
                                  )
                                  document.removeEventListener(
                                    "mouseup",
                                    onMouseUp,
                                  )
                                }

                                document.addEventListener(
                                  "mousemove",
                                  onMouseMove,
                                )
                                document.addEventListener("mouseup", onMouseUp)
                              }}
                            />
                          </div>
                        </Draggable>
                      ))}
                    </>
                  ) : (
                    <div className="w-full">
                      {/* <UpdateCustomImage onImageSelect={handleImageSelect} /> */}
                      <ImageSelector onImageSelect={handleImageSelect} />
                    </div>
                  )}
                </div>
                {selectedImage && selectedTextId ? (
                  <div> </div>
                ) : (
                  <div className="mt-16">
                    <Link to="/auth/home" className="text-[75px] text-[#456]">
                      {/* <Collage /> */}
                      <RowCollage />
                    </Link>
                  </div>
                )}

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
