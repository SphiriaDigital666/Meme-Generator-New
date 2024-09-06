import React, { useState } from "react";
import ImageSelector from "./ImageSelector";
import MemeEditor from "./MemeEditor";

const MemeGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [meme, setMeme] = useState(null);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSaveMeme = (image, texts) => {
    setMeme({ image, texts });
  };

  return (
    <div>
      {!selectedImage ? (
        <ImageSelector onImageSelect={handleImageSelect} />
      ) : (
        <MemeEditor image={selectedImage} onSave={handleSaveMeme} />
      )}
      {meme && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <h2>Saved Meme:</h2>
          <img
            src={meme.image}
            alt="Meme"
            style={{ width: "500px", height: "auto" }}
          />
          {meme.texts.map((text, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: `${text.y}px`,
                left: `${text.x}px`,
                color: text.color,
                fontSize: `${text.fontSize}px`,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                fontFamily: text.fontStyle,
              }}
            >
              {text.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;
