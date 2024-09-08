import React from "react"
import Draggable from "react-draggable"

const TextEditors = ({ texts = [], selectedTextId, handleSelectText, setTexts}) => {
  return (
    <>
      {texts.map((text) => (
        <Draggable
          key={text.id}
          defaultPosition={{ x: text.x, y: text.y }}
          onStop={(e, data) => {
            const updatedTexts = texts.map((t) =>
              t.id === text.id ? { ...t, x: data.x, y: data.y } : t,
            )
            setTexts(updatedTexts)
          }}
        >
          <div
            id={`text-${text.id}`}
            className="absolute left-0 top-0 cursor-move"
            style={{
              color: text.color,
              fontSize: `${text.fontSize}px`,
              fontWeight: text.fontWeight,
              textDecoration: text.textDecoration,
              fontFamily: text.fontFamily,
              fontStyle: text.fontStyle, //ch2
              border: text.id === selectedTextId ? "2px dotted #fff" : "none",
            }}
            onClick={() => handleSelectText(text.id)}
          >
            {text.text}
          </div>
        </Draggable>
      ))}
    </>
  )
}

export default TextEditors
