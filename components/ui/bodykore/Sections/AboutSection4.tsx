import Image from 'next/image';
import { useState } from 'react';
import { Review } from 'services/stamped';

interface OneReviewProps {
  img: string;
  reviews: Review[];
}

export default function OneReview({ img, reviews }: OneReviewProps) {
  const [displayed, setDisplayed] = useState(0);
  const mapRating = (rating: number) => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <Image
          src={Math.round(rating) > i ? '/svg/star.svg' : '/svg/starEmpty.svg'}
          width={22}
          height={21}
          key={i}
          alt=""
        />
      );
    }
    return arr;
  };
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center items-center w-full h-fit max-w-7xl m-auto">
          <div className="lg:pr-28">
            <img src={img} alt="" />
          </div>
          <div className="pt-16 lg:pt-14 lg:w-1/3">
            <h1
              className="flex justify-center lg:justify-start font-bebas text-black-373933 italic font-bold text-5xl"
              style={{ letterSpacing: '1px' }}
            >
              “{reviews[displayed].reviewTitle}”
            </h1>
            {/*Rating component*/}
            <div className="flex justify-center pt-6 lg:justify-start gap-1">
              {mapRating(reviews[displayed].reviewRating)}
            </div>

            <p className="font-roboto text-black-1c2023 text-center px-10 lg:px-0 pt-8 lg:text-left leading-relaxed">
              "{reviews[displayed].reviewMessage}"
            </p>
            <h2
              className="flex justify-center lg:justify-start pt-5 font-bebas text-red-bc2026 italic font-bold text-2xl"
              style={{ letterSpacing: '1px' }}
            >
              - {reviews[displayed].author}
            </h2>

            {/* Arrow */}
            {reviews.length > 1 ? (
              <div className="flex justify-center pt-8 lg:pt-0 lg:justify-end">
                <button
                  className="h-10 w-7"
                  onClick={() => {
                    setDisplayed((prev) => (prev + 1) % reviews.length);
                  }}
                >
                  <img src="/svg/reviewArrow.svg" alt="" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
