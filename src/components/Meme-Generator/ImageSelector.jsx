/* import image1 from "../../assets/image01.png"
import image10 from "../../assets/image01.png"
import image2 from "../../assets/image02.png"
import image3 from "../../assets/image03.png"
import image4 from "../../assets/image04.png"
import image5 from "../../assets/image05.png"
import image6 from "../../assets/image06.png"
import image7 from "../../assets/image07.png"
import image8 from "../../assets/image08.png"
import image9 from "../../assets/image09.png" */

import image1 from "./../../assets/backgroundimages/img1.jpeg"
import image2 from "./../../assets/backgroundimages/img2.jpeg"
import image3 from "./../../assets/backgroundimages/img3.jpeg"
import image4 from "./../../assets/backgroundimages/img4.jpeg"
import image5 from "./../../assets/backgroundimages/img5.jpeg"
import image6 from "./../../assets/backgroundimages/img6.jpeg"
import image7 from "./../../assets/backgroundimages/img7.jpeg"
import image8 from "./../../assets/backgroundimages/img8.jpeg"
import image9 from "./../../assets/backgroundimages/img9.jpeg"
import image10 from "./../../assets/backgroundimages/img10.jpeg"



import image14 from "../../assets/dog1.jpg"
import image11 from "../../assets/image11.jpg"
import image12 from "../../assets/image12.jpg"
import image13 from "../../assets/image13.jpg"
import React, { useRef, useState } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const images = [
  { src: image14, route: null, click: true }, // Custom upload image
  { src: image11, route: "/auth/template1", click: false },
  { src: image12, route: "/auth/template2", click: false },
  { src: image13, route: "/auth/template3", click: false },
  { src: image1, route: null, click: false },
  { src: image2, route: null, click: false },
  { src: image3, route: null, click: false },
  { src: image4, route: null, click: false },
  { src: image5, route: null, click: false },
  { src: image6, route: null, click: false },
  { src: image7, route: null, click: false },
  { src: image8, route: null, click: false },
  { src: image9, route: null, click: false },
  { src: image10, route: null, click: false },
]

const ImageSelector = ({ onImageSelect }) => {
  const carouselRef = useRef(null)
  const navigate = useNavigate()
  const [customWidth, setCustomWidth] = useState(300) // default width
  const [customHeight, setCustomHeight] = useState(300) // default height
  const [previewImage, setPreviewImage] = useState(null)
  const [showPopup, setShowPopup] = useState(false) // Modal state

  const [selectedImage, setSelectedImage] = useState(null) // Store selected image
  const [imageUploadState, setImageUploadState] = useState(false)

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / 2
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / 2
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
  }

  const handleSelect = (image) => {
    if (image.route) {
      navigate(image.route)
    } else if (image.click) {
      setShowPopup(true) // Open popup when custom image is clicked
      setImageUploadState(true)
    } else {
      // onImageSelect(image.src)
      setSelectedImage(image.src) // Store the selected image
      setShowPopup(true) // Open popup to input width and height
      setImageUploadState(false)
    }
  }

  const handleResizeImage = () => {
    const img = new Image()
    img.src = selectedImage
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = customWidth
      canvas.height = customHeight
      ctx.drawImage(img, 0, 0, customWidth, customHeight)
      const resizedImage = canvas.toDataURL("image/jpeg")
      setPreviewImage(resizedImage)
      onImageSelect(resizedImage)
      setShowPopup(false) // Close the popup after resizing
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        const img = new Image()
        img.src = result

        img.onload = () => {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          canvas.width = customWidth
          canvas.height = customHeight
          ctx.drawImage(img, 0, 0, customWidth, customHeight)

          const resizedImage = canvas.toDataURL("image/jpeg")
          setPreviewImage(resizedImage)
          onImageSelect(resizedImage)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    document.getElementById("customImageUpload").click() // Trigger file input click
  }

  return (
    <div className="relative w-full overflow-hidden">
      <button
        onClick={handlePrev}
        className="size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 absolute left-0 top-1/2 z-10 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-gray-800 text-sm text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        <FaAngleLeft />
      </button>
      <div
        ref={carouselRef}
        className="no-scrollbar flex w-full overflow-hidden"
      >
        <div className="flex">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Meme ${index}`}
              className="mr-2.5 h-auto w-[calc(33%-6px)] flex-shrink-0 cursor-pointer rounded-md border-[3px] border-gray-300 sm:w-[calc(33%-6px)] md:w-[calc(16.2%-6px)] lg:w-[calc(14%-7px)] lg:border-4 xl:w-[calc(12.5%-10px)] 2xl:w-[calc(12.5%-10px)]"
              onClick={() => handleSelect(image)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 absolute right-0 top-1/2 z-10 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-gray-800 text-sm text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        <FaAngleRight />
      </button>

      {/* Popup Modal for custom image upload */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Custom Image Upload</h2>
            <div className="mb-4 flex">
              <div className="mr-4">
                <label className="text-black">Width:</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="border p-2"
                />
              </div>
              <div>
                <label className="text-black">Height:</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  className="border p-2"
                />
              </div>
            </div>
            {imageUploadState ? (
              <button
                onClick={handleUploadClick}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              >
                Upload Image
              </button>
            ) : (
              <button
                onClick={handleResizeImage}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              >
                Add Background
              </button>
            )}

            <button
              onClick={() => setShowPopup(false)}
              className="ml-4 rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input for custom image upload */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="customImageUpload"
        onChange={handleImageUpload}
      />

      {/* Image preview */}
      {previewImage && (
        <div className="mt-4">
          <h3>Preview:</h3>
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: customWidth, height: customHeight }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageSelector
