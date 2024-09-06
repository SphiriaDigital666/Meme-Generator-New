import image11 from "../../assets/dog1.jpg"
import image1 from "../../assets/image01.png"
import image10 from "../../assets/image01.png"
import image2 from "../../assets/image02.png"
import image3 from "../../assets/image03.png"
import image4 from "../../assets/image04.png"
import image5 from "../../assets/image05.png"
import image6 from "../../assets/image06.png"
import image7 from "../../assets/image07.png"
import image8 from "../../assets/image08.png"
import image9 from "../../assets/image09.png"
import React from "react"

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
  { src: image10, click: false },
]

const MemeCaractors = ({ handleImage }) => {
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
    <div className="mt-5 flex h-screen w-full flex-col items-center overflow-y-auto">
      <div className="mx-auto sm:mt-6">
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
            className="h-32 w-32 cursor-pointer border-b-2 border-indigo-500 pb-1"
            alt=""
            onClick={() =>
              image.click ? handleUploadImage() : handleClickImage(image)
            }
          />
        </div>
      ))}
    </div>
  )
}

export default MemeCaractors
