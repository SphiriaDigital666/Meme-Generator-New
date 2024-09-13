import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import defaultBackground from "../../assets/meme-templates/pre-defined-templates-default-img.jpg"
import Navbar from "../Navbar"
import "./Template.css"
import React, { useState, useRef } from "react"
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa"
import { FaDownload } from "react-icons/fa"
import { FaSquarePlus } from "react-icons/fa6"
import { MdAddPhotoAlternate } from "react-icons/md"
import { MdArrowBackIos } from "react-icons/md"
import { TbPhotoPlus } from "react-icons/tb"
import { Link } from "react-router-dom"

const Template1 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultBackground)
  const [text, setText] = useState("Your Text Here")
  const [textColor, setTextColor] = useState("#000000") // Default text color set to black
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [tempText, setTempText] = useState(text)
  const [isBold, setIsBold] = useState(false) // State to track bold text
  const [isItalic, setIsItalic] = useState(false) // State to track italic text
  const [isUnderline, setIsUnderline] = useState(false) // State to track underline text
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleTextClick = () => {
    setIsPopupOpen(true)
    setTempText(text)
  }

  const handleTextChange = (event) => {
    const inputText = event.target.value
    if (inputText.length > 15) {
      setErrorMessage("Text cannot exceed 15 characters")
    } else {
      setErrorMessage("") // Clear error if within limit
      setTempText(inputText)
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
    if (tempText.length <= 15) {
      setText(tempText)
      setIsPopupOpen(false)
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
      canvas.height = height + 120

      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, width, 120)

      ctx.fillStyle = textColor // Use the selected text color
      ctx.font = `${isBold ? "bold" : "normal"} ${isItalic ? "italic" : ""} 60px Arial` // Apply bold and italic based on state
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, width / 2, 60)

      // Draw underline if required
      if (isUnderline) {
        const textWidth = ctx.measureText(text).width
        ctx.beginPath()
        ctx.moveTo((width - textWidth) / 2, 90) // Adjust underline position
        ctx.lineTo((width + textWidth) / 2, 90)
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.drawImage(image, 0, 120, width, height)

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "memescoin.png"
      link.click()
    }
  }

  return (
    <div className="pre-defined-template-bg relative flex  h-screen flex-col items-center">
      <div className="flex w-full items-start justify-between">
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
            <FaDownload />
          </button>
        </div>
      </div>

      {selectedImage && (
        <div className="relative mt-4 w-max items-center rounded-md bg-white  bg-opacity-30 px-[40px] py-[40px] shadow-md drop-shadow-md backdrop-blur-md sm:flex sm:gap-12 sm:px-[40px] sm:py-[40px] md:gap-12 md:px-[40px] md:py-[40px] lg:gap-16 lg:px-[70px] lg:py-[50px] xl:px-[100px] xl:py-[50px] 2xl:px-[170px] 2xl:py-[60px]">
          <div className="">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
              id="file-upload-template1"
              style={{ display: "none" }}
            />

            <div className="hidden sm:block">
              <div className="flex  flex-col items-center  justify-center rounded-full bg-[#2F2F3B] sm:px-[6px] sm:py-2 ">
                <div className="flex w-full items-center justify-center border-b-[1px] border-white sm:pb-4 sm:pt-4 md:pb-5 md:pt-5">
                  <label
                    htmlFor="file-upload-template1"
                    className="cursor-pointer rounded  text-[45px] text-white"
                  >
                    <div>
                      <TbPhotoPlus className="text-[25px]" />
                    </div>
                  </label>
                </div>

                <div className="flex w-full items-center justify-center border-b-[1px] border-white sm:pb-4 sm:pt-4 md:pb-5 md:pt-5">
                  <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                    className="h-[30px] w-[30px] "
                  />
                </div>

                <div className="flex w-full items-center justify-center border-b-[1px] border-white sm:pb-4 sm:pt-4 md:pb-5 md:pt-5">
                  <button
                    onClick={toggleBold}
                    className={`rounded md:p-2  ${
                      isBold
                        ? ", bg-[#b0b0b0] text-white"
                        : ", bg-[#2F2F3B] text-white"
                    } `}
                  >
                    <FaBold />
                  </button>
                </div>

                <div className="flex w-full items-center justify-center border-b-[1px] border-white sm:pb-4 sm:pt-4 md:pb-5 md:pt-5">
                  <button
                    onClick={toggleItalic}
                    className={`rounded md:p-2 ${
                      isItalic
                        ? "bg-[#b0b0b0] text-white"
                        : ", text-white] bg-[#2F2F3B]"
                    } `}
                  >
                    <FaItalic />
                  </button>
                </div>

                <div className="flex w-full items-center justify-center border-b-[1px] border-white sm:pb-4 sm:pt-4 md:pb-5 md:pt-5">
                  <button
                    onClick={toggleUnderline}
                    className={`rounded text-white md:p-2 ${
                      isUnderline
                        ? "bg-[#b0b0b0] text-white"
                        : ", bg-[#2F2F3B] text-[#343434]"
                    } `}
                  >
                    <FaUnderline />
                  </button>
                </div>

                <div className="flex w-full items-center justify-center sm:pb-4 sm:pt-4 md:pb-5 md:pt-5">
                  <button onClick={downloadImage}>
                    <FaDownload />
                  </button>
                </div>
              </div>
            </div>

            {/* Text editor bar for large screens and below */}
            <div className="block sm:hidden">
              <div className="mb-6  flex items-center  justify-center rounded-full bg-[#2F2F3B] px-2">
                <div className="flex w-full items-center justify-center pb-2 pt-2">
                  <label
                    htmlFor="file-upload-template1"
                    className="cursor-pointer rounded  text-[45px] text-white"
                  >
                    <div>
                      <TbPhotoPlus className="text-[20px]" />
                    </div>
                  </label>
                </div>

                <div className="flex w-full items-center justify-center  pb-2 pt-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                    className="h-[30px] w-[30px] "
                  />
                </div>

                <div className="flex w-full items-center justify-center  pb-2 pt-2">
                  <button
                    onClick={toggleBold}
                    className={`rounded p-2  ${
                      isBold
                        ? ", bg-[#b0b0b0] text-white"
                        : ", bg-[#2F2F3B] text-white"
                    } `}
                  >
                    <FaBold className="text-[15px]" />
                  </button>
                </div>

                <div className="flex w-full items-center justify-center  pb-2 pt-2">
                  <button
                    onClick={toggleItalic}
                    className={`rounded p-2 ${
                      isItalic
                        ? "bg-[#b0b0b0] text-white"
                        : ", text-white] bg-[#2F2F3B]"
                    } `}
                  >
                    <FaItalic className="text-[15px]" />
                  </button>
                </div>

                <div className="flex w-full items-center justify-center  pb-2 pt-2">
                  <button
                    onClick={toggleUnderline}
                    className={`rounded p-2 text-white ${
                      isUnderline
                        ? "bg-[#b0b0b0] text-white"
                        : ", bg-[#2F2F3B] text-[#343434]"
                    } `}
                  >
                    <FaUnderline className="text-[15px]" />
                  </button>
                </div>

                <div className="flex w-full items-center justify-center pb-2 pt-2">
                  <button onClick={downloadImage}>
                    <FaDownload className="text-[15px]" />
                  </button>
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="flex w-full flex-col items-center">
            <div
              className=" w-[260px] cursor-pointer bg-white p-2 text-center text-[20px] sm:w-[400px] md:w-[520px] lg:w-[700px] lg:p-4 lg:text-[35px] xl:w-[800px] 2xl:w-[800px]"
              onClick={handleTextClick}
              style={{
                color: textColor,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                textDecoration: isUnderline ? "underline" : "none",
              }} // Apply text styles
            >
              {text}
            </div>

            <div className=" relative">
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
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="h-auto w-[260px] rounded-b shadow-md sm:w-[400px] md:w-[520px] lg:w-[700px] xl:w-[800px] 2xl:w-[800px]"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white shadow-md lg:p-4">
            <h2 className="mb-2 text-lg text-black lg:text-xl">
              Enter your text
            </h2>
            <input
              type="text"
              value={tempText}
              onChange={handleTextChange}
              className="mb-4 w-full border p-2"
            />
            {errorMessage && (
              <p className="mb-3 text-red-500">{errorMessage}</p>
            )}

            <button
              onClick={handleDoneClick}
              disabled={tempText.length > 15}
              className={`rounded px-4 py-2 text-white ${
                tempText.length > 15
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template1
