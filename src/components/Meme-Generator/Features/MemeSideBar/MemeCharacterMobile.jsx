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
import * as $ from "jquery"
import React from "react"
import OwlCarousel from "react-owl-carousel"

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
  const options = {
    responsive: {
      0: {
        items: 4.5,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
    nav: false,
    dots: false,
    loop: true,
    margin: 20,
    autoplay: true,
  }

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
  return (
    <div className="flex sm:hidden">
      {selectedImage && (
        <div className="right-section  w-full rounded-lg bg-[#16151a]">
          {selectedImage && selectedTextId && (
            <OwlCarousel
              className="owl-theme section inline sm:hidden"
              loop
              margin={20}
              autoplay
              {...options}
            >
              <div className="mx-auto">
                <input
                  id="fileInput"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleStickerUpload}
                />
              </div>
              {images.map((image, i) => (
                <div key={i}>
                  <img
                    src={image.src}
                    className="cursor-pointer"
                    alt=""
                    onClick={() =>
                      image.click
                        ? handleUploadImage()
                        : handleClickImage(image)
                    }
                  />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      )}
    </div>
  )
}

export default MemeCharactersMobile
