"use client";

import { useState } from "react";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://via.placeholder.com/600x300?text=Slide+1",
        "https://via.placeholder.com/600x300?text=Slide+2",
        "https://via.placeholder.com/600x300?text=Slide+3",
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full flex-shrink-0"
                    />
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                ❮
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                ❯
            </button>

            {/* Dots
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex
                            ? "bg-white"
                            : "bg-gray-400 hover:bg-gray-500"
                            }`}
                    ></button>
                ))}
            </div> */}
        </div>
    );
};

export default Carousel;
