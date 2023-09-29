import { useState } from 'react'
import houseImage from '../../../../../public/images/imageHouse.png'
import Image from 'next/image'
interface ImageCarouselProps {
  images: string[]
  width?: string
  height?: string
}

const ImageCarousel = ({
  images,
  width = 'w-64',
  height = 'h-42'
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    )
  }

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="relative shadow-sm">
      {images ? (
        <img
          src={images[currentIndex]}
          alt="Carousel"
          className={`rounded-lg object-cover cursor-pointer hover:scale-110 transition translate ${width} ${height}`}
          onClick={handleImageClick}
        />
      ) : (
        <Image
          src={houseImage}
          alt="Carousel"
          className={`rounded-lg object-cover cursor-pointer hover:scale-110 transition translate ${width} ${height}`}
          onClick={handleImageClick}
          width={200}
          height={20}
        />
      )}
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
  )
}

export default ImageCarousel
