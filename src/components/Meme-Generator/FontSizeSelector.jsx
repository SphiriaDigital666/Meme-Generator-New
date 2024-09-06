import React from "react"

const FontSizeSelector = ({ currentSize, onSizeChange }) => {
  return (
    <div className="w-full">
      {/* <h3 className="mb-2 leading-6 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
        Select Font Size:
      </h3> */}
      <select
        value={currentSize}
        onChange={onSizeChange}
        className=" w-full rounded-md bg-[#212024] px-2 py-1"
      >
        {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(
          (size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ),
        )}
      </select>
    </div>
  )
}

export default FontSizeSelector
