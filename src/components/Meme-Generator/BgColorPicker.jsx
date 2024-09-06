// const BackgroundColorPicker = ({ currentColor, onColorChange }) => (
//   <div>
//     <ChromePicker color={currentColor} onChangeComplete={onColorChange} />
//   </div>
// )
// export default BackgroundColorPicker
import React, { useState, useEffect, useRef } from "react"
import { ChromePicker } from "react-color"
import { SketchPicker } from "react-color"

const BackgroundColorPicker = ({ currentColor, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const pickerRef = useRef(null)

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowColorPicker(false)
    }
  }

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showColorPicker])

  return (
    <div className="">
      {/* <h3 className="mb-2 leading-6 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
        Background Color
      </h3> */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        style={{
          backgroundColor: currentColor,
          width: "70px",
          height: "30px",
          border: "2px solid white",
          cursor: "pointer",
          position: "relative",
          borderRadius: "5px",
        }}
      />
      {showColorPicker && (
        <div className="absolute" ref={pickerRef}>
          <ChromePicker color={currentColor} onChangeComplete={onColorChange} />
        </div>
      )}
    </div>
  )
}

export default BackgroundColorPicker
