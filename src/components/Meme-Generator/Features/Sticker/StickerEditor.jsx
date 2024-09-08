// StickerEditor.js
import closeImg from "./../../../../assets/icons/close-button.png"
import resizeImg from "./../../../../assets/icons/resize.png"
import rotateImg from "./../../../../assets/icons/rotate.svg"
import React from "react"
import Draggable from "react-draggable"
import { MdArrowBackIos } from "react-icons/md"

const StickerEditor = ({
  stickers,
  selectedStickerId,
  handleStickerDrag,
  handleStickerResize,
  handleStickerRotate,
  handleDeleteSticker,
  handleSelectSticker,
}) => {
  return (
    <>
      {stickers.map((sticker) => (
        <Draggable
          key={sticker.id}
          defaultPosition={{ x: sticker.x, y: sticker.y }}
          onStop={(e, data) => handleStickerDrag(sticker.id, data.x, data.y)}
        >
          <div
            id={`sticker-${sticker.id}`}
            className="absolute left-0 top-0 cursor-move overflow-visible"
            style={{
              width: `${sticker.width}px`,
              height: `${sticker.height}px`,
              border:
                sticker.id === selectedStickerId ? "2px dotted #fff" : "none",
            }}
            onClick={() => handleSelectSticker(sticker.id)}
          >
            <img
              src={sticker.src}
              alt="Sticker"
              className="h-full w-full"
              style={{
                transform: `rotate(${sticker.rotation}deg)`,
              }}
            />
            <div
              className="sticker-close-button absolute right-[50%] top-[-20px] h-[15px] w-[15px] translate-x-1/2 cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url(${rotateImg})` }}
              onMouseDown={(e) => {
                e.stopPropagation()
                const stickerCenterX =
                  e.currentTarget.getBoundingClientRect().left +
                  sticker.width / 2
                const stickerCenterY =
                  e.currentTarget.getBoundingClientRect().top +
                  sticker.height / 2

                const startAngle = sticker.rotation
                const startX = e.clientX
                const startY = e.clientY

                const calculateAngle = (clientX, clientY) => {
                  const dx = clientX - stickerCenterX
                  const dy = clientY - stickerCenterY
                  return Math.atan2(dy, dx) * (180 / Math.PI)
                }

                const startRotationAngle = calculateAngle(startX, startY)

                const onMouseMove = (moveEvent) => {
                  const currentRotationAngle = calculateAngle(
                    moveEvent.clientX,
                    moveEvent.clientY,
                  )
                  const newRotation =
                    startAngle + (currentRotationAngle - startRotationAngle)
                  handleStickerRotate(sticker.id, newRotation)
                }

                const onMouseUp = () => {
                  document.removeEventListener("mousemove", onMouseMove)
                  document.removeEventListener("mouseup", onMouseUp)
                }

                document.addEventListener("mousemove", onMouseMove)
                document.addEventListener("mouseup", onMouseUp)
              }}
            />
            <div
              className="sticker-close-button pointer absolute right-[5px] top-[5px] flex h-5 w-5 cursor-pointer items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${closeImg})` }}
              onClick={() => handleDeleteSticker(sticker.id)}
            />
            <div
              className="sticker-close-button absolute bottom-0 right-0 h-[15px] w-[15px] cursor-nwse-resize bg-white/50 bg-cover bg-center"
              style={{ backgroundImage: `url(${resizeImg})` }}
              onMouseDown={(e) => {
                e.stopPropagation()
                const startX = e.clientX
                const startY = e.clientY
                const startWidth = sticker.width
                const startHeight = sticker.height

                const onMouseMove = (moveEvent) => {
                  const newWidth = startWidth + (moveEvent.clientX - startX)
                  const newHeight = startHeight + (moveEvent.clientY - startY)
                  handleStickerResize(sticker.id, newWidth, newHeight)
                }

                const onMouseUp = () => {
                  document.removeEventListener("mousemove", onMouseMove)
                  document.removeEventListener("mouseup", onMouseUp)
                }

                document.addEventListener("mousemove", onMouseMove)
                document.addEventListener("mouseup", onMouseUp)
              }}
            />
          </div>
        </Draggable>
      ))}
    </>
  )
}

export default StickerEditor
