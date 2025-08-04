import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-fade';

import { EffectFade } from 'swiper/modules';

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

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0);
      setCurrentIndex(0);
      swiper.on("slideChange", () => setCurrentIndex(swiper.realIndex));
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
    <div className="image-swiper ">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setCurrentIndex(s.realIndex)}
        spaceBetween={10}
        slidesPerView={1}
        modules={[EffectFade]}
        effect="fade"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="">
            <div className="md:p-7 w-full lg:w-auto lg:mx-auto lg:max-w-4xl mt-44 lg:mt-0 min-h-64 text-center content-center rounded-lg">
              <img
                src={image}
                alt={`Power system diagram ${index + 1}`}
                className="w-full h-full object-contain rounded-md "
                loading="lazy"
              />
              {/* <p className="mt-2 mb-2 text-sm text-txt-p dark:text-darkmode-txt-p">
                {index + 1} of {images.length}
              </p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <nav className="flex justify-center pb-8 mt-5">
        <div className="glass rounded-lg p-4 mx-2">
          <div className="flex items-center justify-between gap-6 min-w-64">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-s/50 hover:bg-bg-s transition-colors cursor-pointer text-txt-p dark:text-darkmode-txt-p hover:text-txt-h dark:hover:text-darkmode-txt-h"
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous image"
            >
              <FaArrowLeft className="text-sm" />
            </button>
            
            <div className="flex items-center gap-2 px-2">
              <input
                type="number"
                className="w-12 text-center bg-bg-s/30 border border-border/30 dark:border-darkmode-border/30 rounded px-2 py-1 text-sm text-txt-p dark:text-darkmode-txt-p focus:outline-none focus:border-primary"
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
              <span className="text-txt-p dark:text-darkmode-txt-p text-sm font-medium">
                / {images.length}
              </span>
            </div>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-s/50 hover:bg-bg-s transition-colors cursor-pointer text-txt-p dark:text-darkmode-txt-p hover:text-txt-h dark:hover:text-darkmode-txt-h"
              onClick={() => swiper?.slideNext()}
              aria-label="Next image"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ImageSwiper;
