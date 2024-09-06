import React from "react"

const FontSelector = ({ currentFontFamily, onFontFamilyChange }) => {
  return (
    <div className="w-full">
      {/* <h3 className="mb-2 text-white sm:text-[14px] lg:text-[15px] 2xl:text-[16px]">
        Select Font Style
      </h3> */}

      <select
        value={currentFontFamily}
        onChange={onFontFamilyChange}
        className="w-full rounded-md bg-[#212024] px-2 py-1"
      >
        <option value="Roboto">Roboto</option>
        <option value="Lobster">Lobster</option>
        <option value="Oswald">Oswald</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Raleway">Raleway</option>
        <option value="Pacifico">Pacifico</option>
      </select>
    </div>
  )
}

export default FontSelector
