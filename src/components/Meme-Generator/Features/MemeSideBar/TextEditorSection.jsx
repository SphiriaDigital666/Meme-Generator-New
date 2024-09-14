import TextIcon from "./../../../../assets/textEditor/Lowercase.png"
import BackgroundColorPicker from "./../../BgColorPicker"
import ColorPicker from "./../../ColorPicker"
import TextEditor from "./../../Features/MemeSideBar/TextEditor"
import FontSelector from "./../../FontSelector"
import FontSizeSelector from "./../../FontSizeSelector"
import React from "react"
import { MdArrowBackIos, MdDownloadForOffline, MdImage } from "react-icons/md"

const TextEditorSection = ({
  texts,
  selectedTextId,
  currentColor,
  backgroundColor,
  handleTextChange,
  handleAddText,
  handleDeleteText,
  handleToggleBold,
  handleToggleItalic,
  handleToggleUnderline,
  handleColorChange,
  handleFontFamilyChange,
  handleFontSizeChange,
  handleBackgroundColorChange,
  setSelectedImage,
  selectedImage,
  handleDownloadMeme,
  goBack,
}) => {
  const selectedText = texts.find((text) => text.id === selectedTextId)

  const changeImage = () => {
    goBack()
  }

  return (
    <div className="right-section ml-4 hidden rounded-lg bg-[#16151a] sm:inline">
      {selectedTextId ? (
        <>
          <div className="flex h-20 w-full flex-row items-center justify-between p-4">
            <img
              src={TextIcon}
              alt="Text Editor"
              className="w-5 md:w-6 lg:w-7 xl:w-8 2xl:w-9"
            />
            <p className="pr-3 text-[13px] text-white md:text-[14px] lg:text-[15px] xl:text-[16px]">
              Text Editor
            </p>
          </div>

          <div className="border-b border-t border-[#535353] px-4 py-4">
            <TextEditor
              text={selectedText}
              onTextChange={handleTextChange}
              onAddText={handleAddText}
              onDeleteText={handleDeleteText}
              onToggleBold={handleToggleBold}
              onToggleItalic={handleToggleItalic}
              onToggleUnderline={handleToggleUnderline}
              isAddDisabled={texts.length >= 4}
            />
          </div>

          <div className="settings-section">
            <div>
              {" "}
              <div className="flex flex-col items-start border-b border-[#535353] px-4 py-4">
                <div className="flex w-full flex-row justify-between">
                  <h3 className="text-white">Select Text Color</h3>
                  <ColorPicker
                    currentColor={currentColor}
                    onColorChange={handleColorChange}
                  />
                </div>
                <div className="mt-4 flex w-full flex-row justify-between">
                  <h3 className="text-white">Select Background Color</h3>
                  <BackgroundColorPicker
                    currentColor={backgroundColor}
                    onColorChange={handleBackgroundColorChange}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start border-b border-[#535353] px-4 py-4">
                <div className="flex w-full flex-row justify-between">
                  <h3 className="text-white">Font Style</h3>
                  <FontSelector
                    currentFontFamily={selectedText?.fontFamily}
                    onFontFamilyChange={handleFontFamilyChange}
                  />
                </div>
                <div className="mt-4 flex w-full flex-row justify-between">
                  <h3 className="text-white">Font Size</h3>
                  <FontSizeSelector
                    currentSize={selectedText?.fontSize}
                    onSizeChange={handleFontSizeChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center">
              <button
                className="mx-3 mt-4 flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#5f5f5f] py-2 text-[10px] leading-none text-white md:w-[110px] md:text-[11px] lg:mx-0 lg:w-[120px] lg:text-[12px] xl:w-[130px] xl:text-[13px] 2xl:w-[150px] 2xl:text-[14px]"
                onClick={() => changeImage()} // Option to clear the image
              >
                <MdImage className="-translate-y-[1px]" />
                Change Image
              </button>
              <button
                className="mx-3 mt-4 flex w-[100px] items-center justify-center gap-1 rounded-md bg-[#8B84EE] py-2 text-[10px] leading-none text-white md:w-[110px] md:text-[11px] lg:mx-0 lg:w-[120px] lg:text-[12px] xl:w-[130px] xl:text-[13px] 2xl:w-[150px] 2xl:text-[14px]"
                onClick={handleDownloadMeme}
                disabled={!selectedImage}
              >
                <MdDownloadForOffline />
                Download
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">
          Pick a Meme Template to Start Editing Your Meme.
        </p>
      )}
    </div>
  )
}

export default TextEditorSection
