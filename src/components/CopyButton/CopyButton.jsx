import React, { useState } from "react"
import { MdContentCopy } from "react-icons/md"
import { MdTaskAlt } from "react-icons/md"

const CopyButton = ({ textToCopy }) => {
  const [copySuccess, setCopySuccess] = useState("")

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopySuccess("Copied!")
          setTimeout(() => setCopySuccess(""), 2000) // Reset message after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy code: ", err)
        })
    } else {
      // Fallback for browsers that do not support navigator.clipboard
      const textarea = document.createElement("textarea")
      textarea.value = textToCopy
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand("copy")
        setCopySuccess("Copied!")
        setTimeout(() => setCopySuccess(""), 2000) // Reset message after 2 seconds
      } catch (err) {
        console.error("Fallback: Failed to copy code: ", err)
      }
      document.body.removeChild(textarea)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={copyToClipboard}
        className="rounded-md bg-gradient-to-r from-[#ce2783] to-[#403bc8] px-3 py-2"
      >
        {copySuccess ? <MdTaskAlt /> : <MdContentCopy />}
      </button>
      {/* {copySuccess && (
        <span className="font-medium text-white">{copySuccess}</span>
      )} */}
    </div>
  )
}

export default CopyButton
