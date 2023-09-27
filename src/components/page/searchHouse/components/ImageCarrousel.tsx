import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  width?: string;
  height?: string;
}

const ImageCarousel = ({ images, width = 'w-64', height = 'h-42' }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="relative shadow-sm">
      <img
        src={images[currentIndex]}
        alt="Carousel"
        className={`rounded-lg object-cover cursor-pointer hover:scale-110 transition translate ${width} ${height}`}
        onClick={handleImageClick} 
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white font-bold"
      >
        ❮
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white font-bold"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;
