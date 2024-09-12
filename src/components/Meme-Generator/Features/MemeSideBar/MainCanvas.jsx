import RowCollage from "../../../collage/RowCollage"
import StickerEditor from "./../../Features/Sticker/StickerEditor"
import TextEditors from "./../../Features/Text/TextsEditor"
import ImageSelector from "./../../ImageSelector"
import React, { useRef } from "react"
import { Link } from "react-router-dom"

const MainCanvas = ({
  selectedImage,
  backgroundColor,
  stickers,
  handleStickerDrag,
  handleStickerResize,
  handleStickerRotate,
  handleDeleteSticker,
  handleSelectSticker,
  selectedStickerId,
  texts,
  selectedTextId,
  handleSelectText,
  setTexts,
  handleImageSelect,
  handleDownloadMeme,
  setSelectedImage,
}) => {
  const memeRef = useRef(null)

  return (
    <>
      {selectedImage ? (
        <>
          <div className="flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Meme"
              style={{ backgroundColor: backgroundColor }}
              className="background-image-div-1 h-auto w-auto"
            />
          </div>
          <StickerEditor
            stickers={stickers}
            selectedStickerId={selectedStickerId}
            handleStickerDrag={handleStickerDrag}
            handleStickerResize={handleStickerResize}
            handleStickerRotate={handleStickerRotate}
            handleDeleteSticker={handleDeleteSticker}
            handleSelectSticker={handleSelectSticker}
          />
          <TextEditors
            texts={texts}
            selectedTextId={selectedTextId}
            handleSelectText={handleSelectText}
            setTexts={setTexts}
          />
        </>
      ) : (
        <div className="w-full">
         {/*  <ImageSelector handleImageSelect={handleImageSelect} /> */}
        </div>
      )}

      
    </>
  )
}

export default MainCanvas
