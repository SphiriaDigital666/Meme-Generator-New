import TextIcon from "../../assets/textEditor/Lowercase.png"
import TemplateControl from "../MemeTemplates/TemplateControl"
import RowCollage from "../collage/RowCollage"
import Collage from "../collage/collage"
import resizeImg from "./../../assets/icons/resize.png"
import rotateImg from "./../../assets/icons/rotate.svg"
import BackgroundColorPicker from "./BgColorPicker"
import ColorPicker from "./ColorPicker"
import FontSelector from "./FontSelector"
import FontSizeSelector from "./FontSizeSelector"
import ImageSelector from "./ImageSelector"
import MemeCaractors from "./MemeCaractors"
import TextEditor from "./TextEditor"
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
  const [stickers, setStickers] = useState([]) // State to manage stickers

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

      // Select the previous or next text after deletion, or null if no text remains
      if (newTexts.length > 0) {
        setSelectedTextId(newTexts[0].id) // Select the first remaining text
      } else {
        setSelectedTextId(null) // No text left, set to null
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
    // Ensure the minimum size for stickers to avoid disappearing
    const minSize = 30 // Set minimum size for stickers

    const updatedStickers = stickers.map((sticker) =>
      sticker.id === stickerId
        ? {
            ...sticker,
            width: Math.max(newWidth, minSize), // Prevent size going below the minimum
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
    // Hide all sticker close buttons and remove dotted borders from selected text
    const closeButtons = document.querySelectorAll(".sticker-close-button")
    closeButtons.forEach((button) => {
      button.style.display = "none"
    })

    // Remove the dotted border from the selected text
    const selectedTextElement = document.getElementById(
      `text-${selectedTextId}`,
    )
    selectedTextElement ? (selectedTextElement.style.border = "none") : ""

    // Remove the dotted border from the selected text
    const selectedStickerElement = document.getElementById(
      `sticker-${selectedStickerId}`,
    )
    if (selectedStickerElement) {
      selectedStickerElement.style.border = "none"
    }

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
                <MemeCaractors handleImage={handleImage} />
              )}
            </div>
          )}

          {/* main-body */}
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
                              overflow: "visible",
                            }}
                            onClick={() => handleSelectSticker(sticker.id)}
                          >
                            {/* Sticker Image */}
                            <img
                              id={`sticker-${sticker.id}`}
                              src={sticker.src}
                              alt="Sticker"
                              style={{
                                width: "100%",
                                height: "100%",
                                border:
                                  sticker.id === selectedStickerId
                                    ? "2px dotted #fff"
                                    : "none",
                                transform: `rotate(${sticker.rotation}deg)`,
                              }}
                            />
                            {/* Rotate image */}
                            <div
                              className="sticker-close-button"
                              style={{
                                position: "absolute",
                                top: -20,
                                right: "50%",
                                transform: "translateX(50%)",
                                width: "15px",
                                height: "15px",
                                cursor: "pointer",
                                backgroundImage: `url(${rotateImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation()
                                const stickerCenterX =
                                  e.currentTarget.getBoundingClientRect().left +
                                  sticker.width / 2
                                const stickerCenterY =
                                  e.currentTarget.getBoundingClientRect().top +
                                  sticker.height / 2

                                const startAngle = sticker.rotation
                                const startX = e.clientX
                                const startY = e.clientY

                                const calculateAngle = (clientX, clientY) => {
                                  const dx = clientX - stickerCenterX
                                  const dy = clientY - stickerCenterY
                                  return Math.atan2(dy, dx) * (180 / Math.PI)
                                }

                                const startRotationAngle = calculateAngle(
                                  startX,
                                  startY,
                                )

                                const onMouseMove = (moveEvent) => {
                                  const currentRotationAngle = calculateAngle(
                                    moveEvent.clientX,
                                    moveEvent.clientY,
                                  )
                                  const newRotation =
                                    startAngle +
                                    (currentRotationAngle - startRotationAngle)
                                  handleStickerRotate(sticker.id, newRotation)
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

                            <div
                              className="sticker-close-button" // Add this class
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

                            {/* Resize Handle */}
                            <div
                              className="sticker-close-button"
                              style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: "15px",
                                height: "15px",
                                cursor: "nwse-resize",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                backgroundImage: `url(${resizeImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
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
