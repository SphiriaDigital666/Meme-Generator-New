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

const MemeCaractors = ({ handleImage }) => {
  const handleClickImage = (image) => {
    handleImage(image)
  }
  return (
    <div className="h-screen overflow-y-auto w-full flex flex-col items-center">
      {images.map((image, i) => (
        <div key={i}>
          <img
            src={image.src}
            className="h-32 w-32 border-b-2 border-indigo-500 pb-1 cursor-pointer"
            alt=""
            onClick={() => handleClickImage(image)}
          />
        </div>
      ))}
    </div>
  )
}

export default MemeCaractors
