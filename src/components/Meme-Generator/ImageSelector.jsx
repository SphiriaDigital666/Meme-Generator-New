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
import { IoCloseCircleOutline } from "react-icons/io5"
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
          slidesToShow: 4,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
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
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="px-1 sm:px-2">
            <img
              key={index}
              src={image.src}
              alt={`Meme ${index}`}
              className="cursor-pointer rounded-xl border-2 border-white sm:border-4"
              onClick={() => handleSelect(image)}
            />
          </div>
        ))}
      </Slider>

      {/* Popup Modal for custom image upload */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="mx-4 w-max rounded-lg bg-white p-4">
            <div
              className="mb-2 flex cursor-pointer items-center justify-end"
              onClick={() => setShowPopup(false)}
            >
              <IoCloseCircleOutline className="text-[26px] text-black" />
            </div>

            <div className="mx-8">
              <p className="mb-1 text-center text-[18px] font-medium text-black">
                Choose Your Meme Size
              </p>
              <p className="mb-4 text-center text-[18px] font-medium text-black">
                (In Pixels)
              </p>
              <div className="mb-4 flex flex-col">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Width"
                    value={`${customWidth}`}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-full rounded-md border-2 border-[#bdbdbd] bg-white p-2 text-black"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder="Height"
                    value={`${customHeight}`}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="w-full rounded-md border-2 border-[#bdbdbd] bg-white p-2 text-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center space-x-0 ">
              {imageUploadState ? (
                <button
                  onClick={handleUploadClick}
                  className="mb-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-white sm:mb-0 sm:w-auto"
                >
                  Upload Image
                </button>
              ) : (
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleResizeImage}
                    className="mb-2 mt-4 w-full rounded-md bg-blue-500 bg-gradient-to-r from-[#ce2783] to-[#403bc8] px-4 py-2 text-white"
                  >
                    Add Background
                  </button>
                </div>
              )}
              {/* <button
                onClick={() => setShowPopup(false)}
                className="ml-0 w-full rounded-lg bg-red-500 px-4 py-2 text-white sm:ml-4 sm:w-auto"
              >
                Cancel
              </button> */}
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
     {/*  {previewImage && (
        <div className="mt-4">
          <h3>Preview:</h3>
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: customWidth, height: customHeight }}
          />
        </div>
      )} */}
    </div>
  )
}

export default ImageSelector
