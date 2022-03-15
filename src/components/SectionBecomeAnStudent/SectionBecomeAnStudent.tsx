import React, { FC } from "react";
import ButtonCircle from "components/Button/ButtonCircle";
import rightImg from "images/SVG-subcribe2.png";
import NcImage from "components/NcImage/NcImage";
import Badge from "components/Badge/Badge";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionBecomeAnStudent: FC<SectionSubscribe2Props> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Become a student and subscribe to multiple courses
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          Become a student you can earn extra income by adding courses. Read and
          share new perspectives on just about any topic. Everyone’s welcome.
        </span>
        <ButtonPrimary className="mt-8">Become a student</ButtonPrimary>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnStudent;
