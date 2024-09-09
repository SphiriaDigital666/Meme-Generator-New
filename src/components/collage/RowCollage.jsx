import collage1 from "../../assets/Collage-frames/collage-01.png"
import collage2 from "../../assets/Collage-frames/collage-02.png"
import collage3 from "../../assets/Collage-frames/collage-03.png"
import collage4 from "../../assets/Collage-frames/collage-04.png"
import collage5 from "../../assets/Collage-frames/collage-05.png"
import collage6 from "../../assets/Collage-frames/collage-06.png"
import collage7 from "../../assets/Collage-frames/collage-07.png"
import collage8 from "../../assets/Collage-frames/collage-08.png"
import collage9 from "../../assets/Collage-frames/collage-09.png"
import collage10 from "../../assets/Collage-frames/collage-10.png"
import { useTemplateAction } from "@/hooks/useReduxAction"
import React from "react"

const RowCollage = () => {
  const { changeTemplate } = useTemplateAction()
  const items = [
    { imgSrc: collage1 },
    { imgSrc: collage2 },
    { imgSrc: collage3 },
    { imgSrc: collage4 },
    { imgSrc: collage5 },
    { imgSrc: collage6 },
    { imgSrc: collage7 },
    { imgSrc: collage8 },
    { imgSrc: collage9 },
    { imgSrc: collage10 },
  ]

  const selectTemplate = (index) => {
    changeTemplate(index)
  }

  return (
    <div className="">
      <div className="flex flex-row justify-center text-white md:font-normal">
        {/* <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
          Add Collage
        </h1> */}
      </div>
      <div className="grid grid-cols-2 gap-2 p-2 lg:grid-cols-10 lg:gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => selectTemplate(index)}
          >
            <img
              src={item.imgSrc}
              alt={`Collage ${index + 1}`}
              className="h-auto w-full select-none rounded-t-lg transition-opacity duration-150 ease-linear"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RowCollage
