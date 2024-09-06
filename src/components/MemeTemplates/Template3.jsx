import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import React, { useState, useRef } from "react"
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa"
import { MdAddPhotoAlternate } from "react-icons/md"
import { MdArrowBackIos } from "react-icons/md"
import { Link } from "react-router-dom"

const Template3 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage)
  const [topText, setTopText] = useState("Top Text Here")
  const [bottomText, setBottomText] = useState("Bottom Text Here")
  const [isTopPopupOpen, setIsTopPopupOpen] = useState(false)
  const [isBottomPopupOpen, setIsBottomPopupOpen] = useState(false)
  const [tempText, setTempText] = useState("")
  const [textColor, setTextColor] = useState("#fff") // Default text color set to black
  const [isBold, setIsBold] = useState(false) // State to track bold text
  const [isItalic, setIsItalic] = useState(false) // State to track italic text
  const [isUnderline, setIsUnderline] = useState(false) // State to track underline text

  const [topTextError, setTopTextError] = useState("") // State for top text error
  const [bottomTextError, setBottomTextError] = useState("") // State for bottom text error
  const canvasRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTopTextClick = () => {
    setIsTopPopupOpen(true)
    setTempText(topText)
  }

  const handleBottomTextClick = () => {
    setIsBottomPopupOpen(true)
    setTempText(bottomText)
  }

  const handleTextChange = (event) => {
    const value = event.target.value
    setTempText(value)

    // Check for top text character limit
    if (isTopPopupOpen && value.length > 15) {
      setTopTextError("Text cannot exceed 15 characters")
    } else {
      setTopTextError("")
    }

    // Check for bottom text character limit
    if (isBottomPopupOpen && value.length > 15) {
      setBottomTextError("Text cannot exceed 15 characters")
    } else {
      setBottomTextError("")
    }
  }

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value) // Update the text color
  }

  const toggleBold = () => {
    setIsBold((prevBold) => !prevBold) // Toggle the bold state
  }

  const toggleItalic = () => {
    setIsItalic((prevItalic) => !prevItalic) // Toggle the italic state
  }

  const toggleUnderline = () => {
    setIsUnderline((prevUnderline) => !prevUnderline) // Toggle the underline state
  }

  const handleDoneClick = () => {
    if (isTopPopupOpen && tempText.length <= 15) {
      setTopText(tempText)
      setIsTopPopupOpen(false)
    } else if (isBottomPopupOpen && tempText.length <= 15) {
      setBottomText(tempText)
      setIsBottomPopupOpen(false)
    }
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const image = new Image()
    image.src = selectedImage
    image.onload = () => {
      let width = image.width
      let height = image.height
      const maxWidth = 1920
      const maxHeight = 1080

      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width
        const heightRatio = maxHeight / height
        const resizeRatio = Math.min(widthRatio, heightRatio)

        width = width * resizeRatio
        height = height * resizeRatio
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(image, 0, 0, width, height)

      // Draw top text
      ctx.fillStyle = textColor
      ctx.font = `${isBold ? "bold" : "normal"} ${isItalic ? "italic" : ""} 60px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      const topTextY = 20
      ctx.fillText(topText, canvas.width / 2, topTextY)

      if (isUnderline) {
        const textWidth = ctx.measureText(topText).width
        const scaleFactor = 1 // Adjust if needed
        ctx.beginPath()
        ctx.moveTo((canvas.width - textWidth) / 2, topTextY + 65 * scaleFactor) // Adjust position based on text height
        ctx.lineTo((canvas.width + textWidth) / 2, topTextY + 65 * scaleFactor) // Adjust position based on text height
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw bottom text
      ctx.textBaseline = "bottom"
      const bottomTextY = canvas.height - 20
      ctx.fillText(bottomText, canvas.width / 2, bottomTextY)

      if (isUnderline) {
        const textWidth = ctx.measureText(bottomText).width
        const scaleFactor = 1 // Adjust if needed
        ctx.beginPath()
        ctx.moveTo(
          (canvas.width - textWidth) / 2,
          bottomTextY - 10 * scaleFactor,
        ) // Adjust position based on text height
        ctx.lineTo(
          (canvas.width + textWidth) / 2,
          bottomTextY - 10 * scaleFactor,
        ) // Adjust position based on text height
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.stroke()
      }

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template3.png"
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#47464b]">
      <div className="flex w-full items-start justify-between ">
        <div>
          <Link to="/auth/main">
            <MdArrowBackIos className="ml-5 mt-3 text-[30px]" />
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={downloadImage}
            className=" mr-5 mt-3 rounded bg-green-500 px-2 py-2 text-white hover:bg-green-600"
          >
            Download
          </button>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
        id="file-upload-template3"
        style={{ display: "none" }}
      />

      {selectedImage && (
        <div className="relative mt-4 flex flex-col items-center rounded-md bg-[#16151a] py-[30px] lg:px-[70px]">
          <div className="mb-6 hidden items-center lg:flex">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
              id="file-upload-template1"
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-upload-template1"
              className="cursor-pointer rounded  text-[45px] text-white"
            >
              <div>
                <MdAddPhotoAlternate className="rounded-md border-2 border-solid border-white px-2 text-[60px]" />
              </div>
            </label>

            <div className="flex items-center justify-center gap-1 rounded-md bg-[#fff] p-4">
              <div>
                <input
                  type="color"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="h-[30px] w-[30px]"
                />
              </div>

              <button
                onClick={toggleBold}
                className={`rounded px-4 py-2  ${
                  isBold
                    ? ", bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaBold />
              </button>

              <button
                onClick={toggleItalic}
                className={`rounded px-4 py-2 ${
                  isItalic
                    ? "bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaItalic />
              </button>

              <button
                onClick={toggleUnderline}
                className={`rounded px-4 py-2 text-white ${
                  isUnderline
                    ? "bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaUnderline className="text-[#343434]" />
              </button>
            </div>
          </div>
          <div className="mb-10 flex w-full flex-col items-center">
            <div
              className="w-80 cursor-pointer bg-black bg-opacity-70 py-2 text-center text-xl text-white"
              onClick={handleTopTextClick}
              style={{
                color: textColor,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                textDecoration: isUnderline ? "underline" : "none",
              }} // Apply text styles
            >
              {topText}
            </div>
            <div className="w-80">
              <img
                src={selectedImage}
                alt="Uploaded"
                className="h-auto w-full rounded shadow-md"
              />
            </div>
            <div
              className="cursor-pointer bg-black bg-opacity-70 py-2 text-center text-xl text-white"
              onClick={handleBottomTextClick}
              style={{
                color: textColor,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                textDecoration: isUnderline ? "underline" : "none",
              }} // Apply text styles
            >
              {bottomText}
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {(isTopPopupOpen || isBottomPopupOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-4 shadow-md">
            <h2 className="mb-2 text-xl text-black">Enter your text</h2>
            <input
              type="text"
              value={tempText}
              onChange={handleTextChange}
              className="mb-4 w-full border p-2"
            />
            {isTopPopupOpen && topTextError && (
              <p className="mb-4 text-red-500">{topTextError}</p>
            )}
            {isBottomPopupOpen && bottomTextError && (
              <p className="mb-4 text-red-500">{bottomTextError}</p>
            )}
            <button
              onClick={handleDoneClick}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              disabled={topTextError || bottomTextError} // Disable button if there's an error
            >
              Done
            </button>
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="fixed bottom-0 flex w-full items-center justify-center rounded-t-md bg-white lg:hidden">
          <div className="flex w-10/12 items-center justify-between rounded-md bg-[#fff] px-4 py-1">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
                id="file-upload-template1"
                style={{ display: "none" }}
              />
              <label
                htmlFor="file-upload-template1"
                className="cursor-pointer rounded  text-[45px] text-black"
              >
                <div>
                  <MdAddPhotoAlternate className="rounded-md border-2 border-solid border-white px-2 text-[60px]" />
                </div>
              </label>
            </div>
            <div>
              <svg width="2" height="30" xmlns="http://www.w3.org/2000/svg">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke="gray"
                  stroke-width="3"
                />
              </svg>
            </div>
            <div>
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="h-[30px] w-[30px]"
              />
            </div>

            <div
              onClick={toggleBold}
              className={`rounded px-4 py-2  ${
                isBold
                  ? ", bg-[#b0b0b0] text-black"
                  : ", bg-[#fff] text-[#343434]"
              } `}
            >
              <FaBold />
            </div>

            <div
              onClick={toggleItalic}
              className={`rounded px-4 py-2 ${
                isItalic
                  ? "bg-[#b0b0b0] text-black"
                  : ", bg-[#fff] text-[#343434]"
              } `}
            >
              <FaItalic />
            </div>

            <div
              onClick={toggleUnderline}
              className={`rounded px-4 py-2 text-white ${
                isUnderline
                  ? "bg-[#b0b0b0] text-black"
                  : ", bg-[#fff] text-[#343434]"
              } `}
            >
              <FaUnderline className="text-[#343434]" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template3
