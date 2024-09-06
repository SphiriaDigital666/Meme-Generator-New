import React, { useState } from "react"
import { AiFillPicture } from "react-icons/ai"
import { MdCloudUpload } from "react-icons/md"

const UpdateCustomImage = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        setSelectedImage(result)
        if (onImageSelect) {
          onImageSelect(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className=" mb-6 mt-4 flex flex-col  justify-center gap-2">
      {selectedImage ? (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-20 w-20 rounded-md border-4 border-gray-300 object-cover"
          />
        </div>
      ) : (
        <label className="flex w-full cursor-pointer  rounded-md">
          {/* <span className="w-full text-white">Click to upload an image</span> */}
          <div>
            {/* <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-6">
              <MdCloudUpload className="text-[60px]" />
            </div> */}

            <div>
              <div className="flex items-center justify-center">
                {" "}
                <p className="mb-2 text-center text-white">
                  Add a Custom Image
                </p>
              </div>

              <div className=" w-max rounded-md bg-[#514e51] px-8 py-3">
                <AiFillPicture className="text-[55px]" />
              </div>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      )}

      <p className="w-max text-center">OR</p>
    </div>
  )
}

export default UpdateCustomImage
