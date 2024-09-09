import image11 from "../../assets/image11.jpg"
import image12 from "../../assets/image12.jpg"
import image13 from "../../assets/image13.jpg"
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const images = [
  { src: image11, route: "/auth/template1", click: false },
  { src: image12, route: "/auth/template2", click: false },
  { src: image13, route: "/auth/template3", click: false },
]

const PreDefinedTemplates = ({ onImageSelect }) => {
  const carouselRef = useRef(null)
  const navigate = useNavigate()
  const [customWidth, setCustomWidth] = useState(300) // default width
  const [customHeight, setCustomHeight] = useState(300) // default height
  const [previewImage, setPreviewImage] = useState(null)
  const [showPopup, setShowPopup] = useState(false) // Modal state

  const [selectedImage, setSelectedImage] = useState(null) // Store selected image
  const [imageUploadState, setImageUploadState] = useState(false)

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

  return (
    <div className="relative overflow-hidden">
      <div>
        <div className="flex">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Meme ${index}`}
              className="mr-2.5 h-auto w-[100px] cursor-pointer rounded-md border-[3px] border-gray-300 "
              onClick={() => handleSelect(image)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreDefinedTemplates
