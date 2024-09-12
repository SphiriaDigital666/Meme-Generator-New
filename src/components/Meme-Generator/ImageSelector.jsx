import image14 from "../../assets/dog1.jpg"
import image11 from "../../assets/image11.jpg"
import image12 from "../../assets/image12.jpg"
import image13 from "../../assets/image13.jpg"
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
import React, { useRef, useState } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"



const images = [
  { src: image14, route: null, click: true }, // Custom upload image
  /* { src: image11, route: "/auth/template1", click: false },
  { src: image12, route: "/auth/template2", click: false },
  { src: image13, route: "/auth/template3", click: false }, */
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

const ImageSelector = ({ handleImageSelect }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1330,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const carouselRef = useRef(null)
  const navigate = useNavigate()
  const [customWidth, setCustomWidth] = useState(1000) // default width
  const [customHeight, setCustomHeight] = useState(1000) // default height
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
      // handleImageSelect(image.src)
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
      handleImageSelect(resizedImage)
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
          handleImageSelect(resizedImage)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    document.getElementById("customImageUpload").click() // Trigger file input click
  }

  return (
    <div className="relative mt-2 w-full overflow-hidden px-8">
      {/*  <button
        onClick={handlePrev}
        className="size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 absolute left-0 top-1/2 z-10 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full  text-sm text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
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
              className="mr-2.5 h-auto w-[calc(33%-6px)] flex-shrink-0 cursor-pointer rounded-md border-[3px] border-gray-300 sm:w-[calc(33%-6px)] md:w-[calc(16.2%-6px)] lg:w-[calc(14%-7px)] lg:border-4 xl:w-[calc(12.5%-10px)] 2xl:w-[calc(12.5%-9.6px)]"
              onClick={() => handleSelect(image)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 absolute right-0 top-1/2 z-10 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full  text-sm text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        <FaAngleRight />
      </button> */}

      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="">
            <img
              key={index}
              src={image.src}
              alt={`Meme ${index}`}
              className="h-16 w-16 sm:h-32 sm:w-32"
              onClick={() => handleSelect(image)}
            />
          </div>
        ))}
      </Slider>

      {/* Popup Modal for custom image upload */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 sm:max-w-md lg:max-w-lg">
            <h2 className="mb-4 text-center text-xl font-bold">
              Custom Image Upload
            </h2>
            <div className="mb-4 flex flex-col sm:flex-row">
              <div className="mb-4 flex-1 sm:mb-0 sm:mr-4">
                <label className="mb-2 block text-black">Width:</label>
                <input
                  type="text"
                  value={`${customWidth}px`}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full border p-2"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-black">Height:</label>
                <input
                  type="text"
                  value={`${customHeight}px`}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  className="w-full border p-2"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center space-x-0 sm:justify-start sm:space-x-4">
              {imageUploadState ? (
                <button
                  onClick={handleUploadClick}
                  className="mb-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-white sm:mb-0 sm:w-auto"
                >
                  Upload Image
                </button>
              ) : (
                <button
                  onClick={handleResizeImage}
                  className="mb-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-white sm:mb-0 sm:w-auto"
                >
                  Add Background
                </button>
              )}
              <button
                onClick={() => setShowPopup(false)}
                className="ml-0 w-full rounded-lg bg-red-500 px-4 py-2 text-white sm:ml-4 sm:w-auto"
              >
                Cancel
              </button>
            </div>
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
