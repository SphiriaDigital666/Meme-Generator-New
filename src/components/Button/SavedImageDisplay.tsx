import { useSelector } from 'react-redux';
import { RootStateType } from '@/redux/store';

export default function SavedImageDisplay() {
  const savedImage = useSelector((state: RootStateType) => state.canvas.savedImage);

  // Log the savedImage data to verify it is not null
  console.log("Saved Image Data in Display Component:", savedImage);

  if (!savedImage) {
    return <p>No image saved.</p>;
  }

  return (
    <div className="saved-image-container">
      <h2>Saved Image</h2>
      {/* Ensure that the image data is correctly passed to the img tag */}
      <img src={savedImage} alt="Saved Collage" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}
