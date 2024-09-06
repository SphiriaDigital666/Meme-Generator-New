import Template1 from "./Template1"
import Template2 from "./Template2"
import Template3 from "./Template3"
import Template4 from "./Template4"
import html2canvas from "html2canvas"
import React, { useState, useRef, useEffect } from "react"
import Draggable from "react-draggable"
import { MdDownloadForOffline, MdImage } from "react-icons/md"
import { Link } from "react-router-dom"

const TemplateControl = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="App flex min-h-screen flex-col items-center justify-center p-4">
      {!selectedTemplate ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold">Select a Template</h1>
          {/* <button
            onClick={() => handleTemplateSelection("template1")}
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 1
          </button>

          <button
            onClick={() => handleTemplateSelection("template2")}
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 2
          </button>

          <button
            onClick={() => handleTemplateSelection("template3")}
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 3
          </button>

          <button
            onClick={() => handleTemplateSelection("template4")}
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 4
          </button> */}

          <Link
            to="/template1"
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 1
          </Link>
          <Link
            to="/template2"
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 2
          </Link>
          <Link
            to="/template3"
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 3
          </Link>
          {/* <Link
            to="/template4"
            className="mb-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Template 4
          </Link> */}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {selectedTemplate === "template1" && <Template1 />}
          {selectedTemplate === "template2" && <Template2 />}
          {selectedTemplate === "template3" && <Template3 />}
          {selectedTemplate === "template4" && <Template4 />}

          {/* <button
            onClick={() => setSelectedTemplate(null)}
            className="absolute left-4 top-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Back
          </button> */}
        </div>
      )}
    </div>
  )
}

export default TemplateControl
