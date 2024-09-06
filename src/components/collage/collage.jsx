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
import React, { useState } from "react"

const Collage = () => {
  const [currentOffset, setCurrentOffset] = useState(0)
  const windowSize = 3
  const paginationFactor = 220
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

  const atEndOfList =
    currentOffset <= paginationFactor * -1 * (items.length - windowSize)
  const atHeadOfList = currentOffset === 0

  const moveCarousel = (direction) => {
    if (direction === 1 && !atEndOfList) {
      setCurrentOffset(currentOffset - paginationFactor)
    } else if (direction === -1 && !atHeadOfList) {
      setCurrentOffset(currentOffset + paginationFactor)
    }
  }

  return (
    <div className="mb-20 mt-10 flex flex-col items-center text-gray-600">
      <p className="mb-4 mt-6 text-center text-[16px] text-[#fff] sm:pl-[40px] sm:text-left md:text-[19px] lg:text-[20px] xl:text-[21px] 2xl:text-[22px]">
        Collage Editor
      </p>
      <div className="flex items-center justify-center">
        <button
          className={`box-border h-5 w-5 transform cursor-pointer border-r-2 border-t-2 p-2 transition-transform duration-150 ease-linear ${
            atHeadOfList ? "border-black opacity-20" : "border-white"
          }`}
          onClick={() => moveCarousel(-1)}
          disabled={atHeadOfList}
          style={{ transform: "rotate(-135deg)" }}
        ></button>

        <div className="w-160 flex justify-center overflow-hidden">
          <div
            className="flex transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${currentOffset}px)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="m-2 cursor-pointer rounded-lg bg-white shadow-lg"
              >
                {/* <Link to="" className="text-[75px] text-[#456]"> */}
                <img
                  src={item.imgSrc} // Use the imgSrc from the items array
                  className="select-none rounded-t-lg transition-opacity duration-150 ease-linear"
                />
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>

        <button
          className={`box-border h-5 w-5 transform cursor-pointer border-r-2 border-t-2 p-2 transition-transform duration-150 ease-linear ${
            atEndOfList ? "border-black opacity-20" : "border-white"
          }`}
          onClick={() => moveCarousel(1)}
          disabled={atEndOfList}
          style={{ transform: "rotate(45deg)" }}
        ></button>
      </div>
    </div>
  )
}

export default Collage
