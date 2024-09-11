import image1 from "./../../../../assets/characters/image01.png"
import image2 from "./../../../../assets/characters/image02.png"
import image3 from "./../../../../assets/characters/image03.png"
import image4 from "./../../../../assets/characters/image04.png"
import image5 from "./../../../../assets/characters/image05.png"
import image6 from "./../../../../assets/characters/image06.png"
import image7 from "./../../../../assets/characters/image07.png"
import image8 from "./../../../../assets/characters/image08.png"
import image9 from "./../../../../assets/characters/image09.png"
import image11 from "./../../../../assets/dog1.jpg"
import React, { useRef } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"

// Correct import for jQuery

const images = [
  { src: image11, click: true },
  { src: image1, click: false },
  { src: image2, click: false },
  { src: image3, click: false },
  { src: image4, click: false },
  { src: image5, click: false },
  { src: image6, click: false },
  { src: image7, click: false },
  { src: image8, click: false },
  { src: image9, click: false },
]

const MemeCharactersMobile = ({
  handleImage,
  selectedImage,
  selectedTextId,
}) => {
  const carouselRef = useRef(null)

  const handleClickImage = (image) => {
    handleImage(image.src)
  }

  const handleStickerUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        handleImage(event.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleUploadImage = () => {
    document.getElementById("fileInput").click()
  }

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

  return (
    <div className="flex sm:hidden">
      {selectedImage && selectedTextId && (
        <>
          <button onClick={handlePrev} className="size-7">
            <FaAngleLeft />
          </button>
          <div
            ref={carouselRef}
            className="no-scrollbar flex w-full overflow-hidden"
          >
            <div className="flex">
              <div className="mx-auto">
                <input
                  id="fileInput"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleStickerUpload}
                />
              </div>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={`Meme ${index}`}
                  className="mr-2.5 h-auto w-[calc(33%-6px)] flex-shrink-0 cursor-pointer rounded-md border-[3px] border-gray-300 sm:w-[calc(33%-6px)] md:w-[calc(16.2%-6px)] lg:w-[calc(14%-7px)] lg:border-4 xl:w-[calc(12.5%-10px)] 2xl:w-[calc(12.5%-9.6px)]"
                  onClick={() =>
                    image.click ? handleUploadImage() : handleClickImage(image)
                  }
                />
              ))}
            </div>
          </div>
          <button onClick={handleNext} className="size-7">
            <FaAngleRight />
          </button>
        </>
      )}
    </div>
  )
}

export default MemeCharactersMobile
