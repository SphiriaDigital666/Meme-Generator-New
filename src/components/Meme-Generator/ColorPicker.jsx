import React, { useState, useEffect, useRef } from "react"
import { SketchPicker } from "react-color"

const ColorPicker = ({ currentColor, onColorChange }) => {
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
    <div>
      {/* <h3 className="mb-2 leading-6 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
        Text Color
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
          <SketchPicker color={currentColor} onChangeComplete={onColorChange} />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
