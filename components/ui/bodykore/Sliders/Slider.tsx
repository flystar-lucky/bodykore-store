import React, { createRef, useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';

interface BgImageProps {
  url?: string;
  topTitle?: string;
  downTitle?: string;
  link?: string;
}

interface SliderProps {
  title1?: string;
  color1?: string;
  title2?: string;
  color2?: string;
  description?: string;
  btnText?: string;
  btnBorder?: string;
  border?: string;
  style?: string;
  bgImage: BgImageProps[];
  link?: string;
  height?: string;
}

const Slider = ({
  title1,
  color1,
  title2,
  color2,
  description,
  btnText,
  btnBorder,
  border,
  style,
  bgImage,
  link,
  height,
}: SliderProps) => {
  const sliderRef = useRef<any>();
  const [slideBgColor, setSlideBgColor] = useState(0.5);
  const myRefs = useRef<HTMLImageElement[]>([]);
  
  useEffect(() => {
    myRefs.current = bgImage.map((element, i) => myRefs.current[i] ?? createRef());
    // console.log(myRefs.current)
  }, []);
  // const [imgZooms, setImgZooms] = useState(new Array(bgImage.length).fill(false));

  const animateSlide = (bgColor: number) => {
    switch (style) {
      case 'zoom':
        setSlideBgColor(bgColor);
        break;
    }
  };

  // const triggerZoom = (setZoom: boolean, i: number) => {
  //   console.log(myRefs.current[i].style)
  //   if (setZoom) {
  //     myRefs.current[i].style.transform = 'scale(1.1)'
  //   } else {
  //     myRefs.current[i].style.transform = 'scale(1)'
  //   }
  // }

  return (
    <section className="w-full max-w-7xl m-auto">
      <div className="lg:flex lg:flex-row pb-2">
        <div className="lg:flex lg:w-2/4 text-center lg:text-left">
          <span className={`${color2} text-4xl lg:text-5xl font-bebas font-bold italic`}>
            <span
              className={`${color1} text-4xl lg:text-5xl font-bebas font-bold italic pr-2`}
            >
              {title1}
            </span>
            {title2}
          </span>
        </div>
        <div className="flex justify-center lg:justify-end lg:w-2/4 py-8 lg:py-0">
          <Link href={link || '#'} passHref>
            <button
              className={`w-52 h-12 mb-2 bg-transparent text-black-373933 ${border} ${btnBorder} hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg font-bebas`}
              style={{ letterSpacing: '1px' }}
            >
              <h1 className="font-bold">{btnText}</h1>
            </button>
          </Link>
        </div>
      </div>
      <p className="font-roboto text-black-1c2023 lg:w-2/3 pb-8 text-center lg:text-left">
        {description}
      </p>
      <div className="container mt-16 mx-auto"></div>

      <Splide
        ref={sliderRef}
        options={{
          pagination: false,
          gap: '1rem',
          type: 'loop',
          width: '100%',
          autoWidth: false,
          perPage: 3,
          perMove: 1,
        }}
        renderControls={() => (
          <div className="slider-progress">
            <div className="slider-progress-bar"></div>
          </div>
        )}
        onMoved={(splide) => {
          // Update the bar width. CSS is found on components.css
          const end = splide.Components.Controller.getEnd() + 1;
          const bar =
            sliderRef.current.splideRef.current.getElementsByClassName(
              'slider-progress-bar'
            )[0];
          bar.style.width = String((100 * (splide.index + 1)) / end) + '%';
        }}
      >
        {bgImage.map((b, i) => {
          return (
            <SplideSlide key={i} className="flex">
              <div
                className={`${height} relative w-full bg-black bg-opacity-25 hover:bg-opacity-0 transition duration-500`}
              >
                <img
                  //@ts-ignore
                  ref={myRefs.current[i]} 
                  className={`object-cover w-full ${height} transform transition duration-500`}
                  src={b.url}
                  alt=""
                  style={{}}
                />
                <div 
                  className='w-full h-full absolute block top-0 bg-black opacity-25 hover:bg-opacity-0 transition duration-500' 
                  // onMouseEnter={() => triggerZoom(true, i)}
                  // onMouseLeave={() => triggerZoom(false, i)}
                />
                {b.link !== undefined ? (
                  <>
                    {b.topTitle !== undefined ? (
                      <Link href={b.link} passHref>
                        <div className="absolute flex ml-10 mt-5">
                          <h1
                            className="cursor-pointer text-4xl font-bebas font-bold italic absolute text-white"
                            style={{ letterSpacing: '1px' }}
                          >
                            {b.topTitle}
                          </h1>
                        </div>
                      </Link>
                    ) : null}
                    {b.downTitle !== undefined ? (
                      <Link href={b.link} passHref>
                        <div className="absolute flex items-end h-full ml-7 pb-7">
                          <h1
                            className="cursor-pointer text-xl font-roboto text-white"
                            style={{ letterSpacing: '1px' }}
                          >
                            {b.downTitle}
                          </h1>
                        </div>
                      </Link>
                    ) : null}
                  </>
                ) : (
                  <>
                    {b.topTitle !== undefined ? (
                      <div className="absolute flex ml-10 mt-5">
                        <h1
                          className="text-5xl font-bebas font-bold italic absolute text-white"
                          style={{ letterSpacing: '1px' }}
                        >
                          {b.topTitle}
                        </h1>
                      </div>
                    ) : null}
                    {b.downTitle !== undefined ? (
                      <div className="absolute flex items-end h-full ml-7 pb-7">
                        <h1
                          className="text-xl font-roboto text-white"
                          style={{ letterSpacing: '1px' }}
                        >
                          {b.downTitle}
                        </h1>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

export default Slider;
