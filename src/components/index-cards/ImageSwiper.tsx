import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/zoom";
import "@/styles/swiper-custom.css";

import { EffectFade, Zoom } from "swiper/modules";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDay,
  FaQuestion,
} from "react-icons/fa";

type Props = {
  images: string[];
};

const getTodayIndex = () => {
  const today = new Date();
  const year = today.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  let leapYearAdjustment = 0;
  if (
    ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) &&
    dayOfYear > 59
  ) {
    leapYearAdjustment = 1;
  }

  return dayOfYear + leapYearAdjustment - 1;
};

const ImageSwiper = ({ images }: Props) => {
  const todayIndex = getTodayIndex();
  const [swiper, setSwiper] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0);
      setCurrentIndex(0);
      swiper.on("slideChange", () => setCurrentIndex(swiper.realIndex));
      setIsLoading(false);
    }
  }, [swiper]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        swiper?.slidePrev();
      } else if (event.key === "ArrowRight") {
        swiper?.slideNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [swiper]);

  return (
    <div className="image-swiper w-full">
      {isLoading && (
        <div className="flex items-center justify-center h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
          <div className="text-txt-p dark:text-darkmode-txt-p">
            Loading images...
          </div>
        </div>
      )}
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setCurrentIndex(s.realIndex)}
        spaceBetween={10}
        slidesPerView={1}
        modules={[EffectFade, Zoom]}
        effect="fade"
        zoom={{
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
        }}
        touchRatio={1}
        touchAngle={45}
        simulateTouch={true}
        allowTouchMove={true}
        grabCursor={true}
        preventClicks={false}
        preventClicksPropagation={false}
        className={`h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="swiper-zoom-container w-full h-full flex items-center justify-center p-2 sm:p-4">
              <img
                src={image}
                alt={`Power system diagram ${index + 1}`}
                className="max-w-full max-h-full object-contain rounded-md cursor-pointer select-none"
                loading="lazy"
                draggable={false}
                onLoad={() => index === 0 && setIsLoading(false)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <nav className="flex justify-center pb-4 sm:pb-8 mt-2 sm:mt-5">
        <div className="glass rounded-lg p-2 sm:p-4 mx-2">
          <div className="flex items-center justify-between gap-2 sm:gap-6 min-w-48 sm:min-w-64">
            <button
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-purple-300 active:bg-purple-400 border-black border-[1px] transition-colors cursor-pointer text-txt-p dark:text-darkmode-txt-p hover:text-txt-h dark:hover:text-darkmode-txt-h touch-manipulation"
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous image"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
            </button>

            <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
              <input
                type="number"
                className="w-10 sm:w-12 text-center bg-bg-s/30 border border-gray-300 dark:border-darkmode-border/30 rounded px-1 sm:px-2 py-1 text-xs sm:text-sm text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:border-primary"
                min={1}
                max={images.length}
                value={currentIndex + 1}
                onChange={(e) => {
                  const newIndex = parseInt(e.target.value, 10) - 1;
                  setCurrentIndex(newIndex);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    swiper?.slideTo(currentIndex);
                  }
                }}
                aria-label="Jump to image number"
              />
              <span className="text-txt-p dark:text-darkmode-txt-p text-xs sm:text-sm font-medium">
                / {images.length}
              </span>
            </div>

            <button
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-purple-300 active:bg-purple-400 border-black border-[1px] transition-colors cursor-pointer text-txt-p dark:text-darkmode-txt-p hover:text-txt-h dark:hover:text-darkmode-txt-h touch-manipulation"
              onClick={() => swiper?.slideNext()}
              aria-label="Next image"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <FaArrowRight className="text-xs sm:text-sm" />
            </button>
          </div>

          {/* Instructions for mobile zoom */}
          {/* <div className="mt-2 text-center block sm:hidden">
            <p className="text-xs text-txt-p dark:text-darkmode-txt-p opacity-70">
              Pinch to zoom • Double tap to zoom
            </p>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default ImageSwiper;
