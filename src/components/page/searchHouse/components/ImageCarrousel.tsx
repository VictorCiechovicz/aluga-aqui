'use client'

import { useState } from 'react'

interface ImageCarouselProps {
  images: string[]
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    )
  }

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt="Carousel"
        className="w-64 rounded-lg"
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
  )
}

export default ImageCarousel
