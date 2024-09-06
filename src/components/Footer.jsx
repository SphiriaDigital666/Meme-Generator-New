import dextools from "../assets/dextools.svg"
import Dicord from "../assets/discord.png"
import Facebook from "../assets/facebook.png"
import Logo from "../assets/memelogonav.png"
import tel from "../assets/tel.png"
import ticktok from "../assets/ticktok.png"
import X from "../assets/x.png"
import { resourcesLinks, platformLinks, communityLinks } from "../constants1"
import CopyButton from "./CopyButton/CopyButton"

const Footer = () => {
  const text = "ABL6kLtd8TiNcteGithHveFaTvxiuf7fuKph6uAkXV8o"
  return (
    <footer className="mx-auto flex w-[100%] max-w-screen-xl flex-col items-center justify-center border-t border-neutral-700 py-10 lg:mt-20">
      <div className="mt-4 flex flex-row items-center justify-center rounded-lg border border-white px-2 py-2 text-[10px] sm:flex-row sm:text-xl md:text-[12px]">
        <p className="mr-2">{text}</p>
        <CopyButton textToCopy={text} />
      </div>

      <div className="my-10 mb-4 flex cursor-pointer flex-col items-center px-4">
        <div className="flex h-20 w-32 flex-row items-center justify-center sm:h-48 sm:w-48">
          <a
            href="https://www.dextools.io/app/en/solana/pair-explorer/gCXj8pnao62JCYowQt6cT3P1DoVWJsLrYQgf5n1FhEF?t=1724827079468"
            className="text-sm tracking-tight sm:text-lg"
            target="_blank"
          >
            {" "}
            <img className="" src={dextools} alt="MEME_Generate" />
          </a>
        </div>
      </div>

      <div className="flex cursor-pointer items-center justify-center">
        <img
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          src={Logo}
          alt="MEME_Generate"
        />
      </div>

      <div className="mt-6 flex flex-row justify-between sm:w-[50%] md:w-[30%] 2xl:ml-4">
        <div className="flex cursor-pointer flex-col items-center px-4">
          <a
            href="https://x.com/memescoin?s=21&t=UEB_WMtZkqwNoNKZifsE4A"
            className="flex flex-col items-center"
            target="_blank"
          >
            <div className="flex h-5 w-5 flex-row items-center justify-center sm:h-7 sm:w-7">
              <img className="h-[80%] w-[80%]" src={X} alt="MEME_Generate" />
            </div>
            <span className="text-sm tracking-tight sm:text-lg">X</span>
          </a>
        </div>
        <div className="flex cursor-pointer flex-col items-center px-4">
          <a
            href="https://t.me/MemesCoinPortal"
            className="flex flex-col items-center"
            target="_blank"
          >
            <div className="flex h-5 w-5 flex-row items-center justify-center sm:h-7 sm:w-7">
              <img className="" src={tel} alt="MEME_Generate" />
            </div>
            <span className="text-sm tracking-tight sm:text-lg">Telegram</span>
          </a>
        </div>
        <div className="flex cursor-pointer flex-col items-center px-4">
          <a
            href="https://www.tiktok.com/@memescoin.com?_t=8p6ssytySCs&_r=1"
            className="flex flex-col items-center"
            target="_blank"
          >
            <div className="flex h-5 w-5 flex-row items-center justify-center sm:h-7 sm:w-7">
              <img className="" src={ticktok} alt="MEME_Generate" />
            </div>
            <span className="text-sm tracking-tight sm:text-lg">TikTok</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
