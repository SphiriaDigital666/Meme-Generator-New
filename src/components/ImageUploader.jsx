import React, { useState } from "react";

function ImageUploader({ onUpload }) {
  const [fileInput, setFileInput] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
    setFileInput(null); // Reset file input
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        ref={(input) => setFileInput(input)}
      />
    </div>
  );
}

export default ImageUploader;
