import React, { useEffect } from "react"
import { MdDeleteForever, MdAddToPhotos } from "react-icons/md"
import {
  MdFormatBold,
  MdFormatUnderlined,
  MdFormatItalic,
} from "react-icons/md"

const TextEditor = ({
  text,
  onTextChange,
  onAddText,
  onDeleteText,
  onToggleBold,
  onToggleUnderline,
  onToggleItalic,
  isAddDisabled,
}) => {
  return (
    <div className="">
      <div className="mb-4">
        <input
          type="text"
          value={text.text || ""}
          className="w-full rounded-sm bg-[#212025] px-2 py-1.5 text-white sm:text-[14px] lg:text-[15px] 2xl:py-2 2xl:text-[16px]"
          onChange={onTextChange}
          placeholder="Text Editor"
        />
      </div>

      <div className="mb-4 flex items-center gap-4 text-white">
        <button
          onClick={onAddText}
          disabled={isAddDisabled}
          className="flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#50ECC6] px-2 py-1 sm:text-[14px] lg:text-[15px] 2xl:text-[16px]"
        >
          {/* <MdAddToPhotos className="text-[16px] text-[#16151A] 2xl:text-[18px]" /> */}
          <p className="font-semibold text-[#16151A]"> Add</p>
        </button>
        <button
          onClick={onDeleteText}
          className="flex w-[100px] items-center justify-center gap-0.5 rounded-md bg-[#EC917D] px-2 py-1 sm:text-[14px] lg:text-[15px] 2xl:text-[16px]"
        >
          {/* <MdDeleteForever className="-translate-y-[1px] text-[16px] text-[#16151A] 2xl:text-[18px]" /> */}
          <p className="font-semibold text-[#16151A]"> Delete</p>
        </button>
      </div>

      <div className="flex gap-1 text-white">
        <button
          className="rounded-l-lg"
          onClick={onToggleBold}
          style={{
            fontWeight: text.fontWeight === "bold" ? "bold" : "normal",
            backgroundColor: text.fontWeight === "bold" ? "#444" : "#212024",

            padding: "2px",
          }}
        >
          <div className="px-6 py-1">
            <MdFormatBold className="text-[18px]" />
          </div>
        </button>
        <button
          onClick={onToggleItalic}
          style={{
            fontStyle: text.fontStyle === "italic" ? "italic" : "normal",
            backgroundColor: text.fontStyle === "italic" ? "#444" : "#212024",

            padding: "2px",
          }}
        >
          <div className="px-6 py-1">
            <MdFormatItalic className="text-[18px]" />
          </div>
        </button>
        <button
          className="rounded-r-lg"
          onClick={onToggleUnderline}
          style={{
            textDecoration:
              text.textDecoration === "underline" ? "underline" : "none",
            backgroundColor:
              text.textDecoration === "underline" ? "#444" : "#212024",

            padding: "2px",
          }}
        >
          <div className="px-6 py-1">
            <MdFormatUnderlined className="text-[18px]" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default TextEditor
