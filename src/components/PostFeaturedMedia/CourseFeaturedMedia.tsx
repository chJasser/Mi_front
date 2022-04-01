import React, { FC, useRef } from "react";
import NcImage from "components/NcImage/NcImage";
import { CourseDataType } from "data/types";
import useIntersectionObserver from "hooks/useIntersectionObserver";

const base_url = "http://localhost:5050/";
export interface courseFeaturedMediaProps {
  className?: string;
  isHover?: boolean;
  course;
}

// CHECK FOR VIDEO CARD ON VIEW
let PREV_RATIO = 0.0;

const CourseFeaturedMedia: FC<courseFeaturedMediaProps> = ({
  className = " w-full h-full ",
  course,
  isHover = false,
}) => {
  const { courseImage } = course;

  const videoRef = useRef(null);

  let IS_MOBILE = false;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    IS_MOBILE = true;
  }

  const cardIntersectionObserver = useIntersectionObserver(videoRef, {
    freezeOnceVisible: false,
    threshold: 0.999,
    rootMargin: "20px",
  });
  const IN_VIEW =
    (cardIntersectionObserver?.intersectionRatio || -1) > PREV_RATIO;
  PREV_RATIO = cardIntersectionObserver?.intersectionRatio || 0;

  return (
    <div
      className={`nc-PostFeaturedMedia relative ${className}`}
      data-nc-id="PostFeaturedMedia"
      ref={videoRef}
    >
      <NcImage
        containerClassName="absolute inset-0"
        src="https://www.google.com/search?q=course+image&tbm=isch&source=iu&ictx=1&vet=1&fir=kkofmRdbMDyrtM%252CBV3u0uNH-ZrwUM%252C_%253BQn7EbRq9SAPVrM%252CXtgyaZ6Y78Ec6M%252C_%253BbJj6SvvtvG7QUM%252CXtgyaZ6Y78Ec6M%252C_%253BLVjlDhNa7QU3CM%252CtUzNYMJ_N_eMpM%252C_%253BrRR5ntSINlk3WM%252CQyltoee9A1_LaM%252C_%253B-q1Fz2gZGS3PVM%252C5FRyXdGDvXL7-M%252C_%253B6rbdy7h7LQmjDM%252CaxrLUcMFXx09UM%252C_%253BaJZ1LVvJd4Qw9M%252CXtgyaZ6Y78Ec6M%252C_%253B1wI_FcaNygjlkM%252CqEwLDDm7skwptM%252C_%253BEkCSOnalpSZS-M%252CQyltoee9A1_LaM%252C_%253BquGmr20p2k26KM%252CcnrgEaL4mvGrYM%252C_%253Bxku8s44sHhPrxM%252CD6b4Wlfz7nBPfM%252C_%253BkpC49VTPMS9OhM%252CqES_pTYx0_jzKM%252C_&usg=AI4_-kTtfYR4YJesxwi91E-F2Ouvmo9V4w&sa=X&ved=2ahUKEwj9tu_5g-b2AhUNG-wKHRZUCgUQ9QF6BAgLEAE#imgrc=quGmr20p2k26KM"
        alt="image"
      />

      {/* {renderContent()} */}
    </div>
  );
};

export default CourseFeaturedMedia;
