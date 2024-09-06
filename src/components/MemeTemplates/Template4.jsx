import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import html2canvas from "html2canvas"
import React, { useState, useRef } from "react"

function Template4() {
  const [title, setTitle] = useState("Your news title")
  const [subtitle, setSubtitle] = useState("Your news subtitle is here")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEditing, setCurrentEditing] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [backgroundImage, setBackgroundImage] = useState(defaultImage)
  const containerRef = useRef(null)
  const buttonsRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleTitleClick = () => {
    setCurrentEditing("title")
    setInputValue(title) 
    setIsModalOpen(true)
  }

  const handleSubtitleClick = () => {
    setCurrentEditing("subtitle")
    setInputValue(subtitle) 
    setIsModalOpen(true)
  }

  const handleModalSubmit = () => {
    if (currentEditing === "title") {
      setTitle(inputValue)
    } else if (currentEditing === "subtitle") {
      setSubtitle(inputValue)
    }
    setIsModalOpen(false)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBackgroundImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    if (containerRef.current) {
     
      if (buttonsRef.current) {
        buttonsRef.current.style.display = "none"
      }
      if (fileInputRef.current) {
        fileInputRef.current.style.display = "none"
      }

      html2canvas(containerRef.current, { scale: 1 }).then((canvas) => {
       
        if (buttonsRef.current) {
          buttonsRef.current.style.display = ""
        }
        if (fileInputRef.current) {
          fileInputRef.current.style.display = ""
        }

        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = "download.png"
        link.click()
      })
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute left-4 top-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          ref={fileInputRef}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
        >
          Choose File
        </label>
      </div>

      <div
        className="flex h-full w-full items-center justify-center"
        style={{ maxWidth: "1280px", maxHeight: "1280px" }}
      >
        <img
          src={backgroundImage}
          alt="Background"
          className="h-full w-full object-cover"
          style={{ maxWidth: "1280px", maxHeight: "1280px" }}
        />
      </div>

      <div className="absolute bottom-0 w-full pl-4">
        <p className="bg-white p-1 pl-2 text-[25px] font-bold text-[#670003]">
          Breaking News
        </p>

        <div className="border-l-4 border-white bg-[#821317] pb-3 pl-2">
          <p className="cursor-pointer text-[35px]" onClick={handleTitleClick}>
            {title}
          </p>
          <p
            className="cursor-pointer pb-3 text-[30px]"
            onClick={handleSubtitleClick}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div className="absolute right-4 top-4" ref={buttonsRef}>
        <button
          onClick={handleDownload}
          className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white"
        >
          Download
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="rounded bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-xl">{`Edit ${currentEditing}`}</h2>
            <input
              type="text"
              className="w-full border p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleModalSubmit}
                className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Done
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template4
