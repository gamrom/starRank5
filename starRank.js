import { css } from "@emotion/react";

const Star = ({ singleValue, webSize, mobileSize }) => {
  const ratingPercent = `${singleValue * 100}%`;

  return (
    <div
      css={css`
        @media (min-width: 768px) {
          font-size: ${webSize}px;
        }
        @media (max-width: 767px) {
          font-size: ${mobileSize}px;
        }

        display: inline-block;
        font-family: Times; // make sure ★ appears correctly
        line-height: 1;
        &::before {
          content: "★";
          background: linear-gradient(
            90deg,
            #ffcc00 ${ratingPercent},
            #6b6b6b ${ratingPercent}
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}
    ></div>
  );
};

const StarRankGroup = ({ value, webSize, mobileSize }) => {
  let initialArray = [];

  if (value === 5) {
    initialArray = [1, 1, 1, 1, 1];
  } else if (4 <= value && value < 5) {
    initialArray = [1, 1, 1, 1, Math.round((value % 1) * 100) / 100];
  } else if (3 <= value && value < 4) {
    initialArray = [1, 1, 1, Math.round((value % 1) * 100) / 100, 0];
  } else if (2 <= value && value < 3) {
    initialArray = [1, 1, Math.round((value % 1) * 100) / 100, 0, 0];
  } else if (1 <= value && value < 2) {
    initialArray = [1, Math.round((value % 1) * 100) / 100, 0, 0, 0];
  } else {
    initialArray = [1, 0, 0, 0, 0];
  }

  return (
    <div
      className="flex"
      css={css`
        div + div {
          margin-left: 2px;
        }
        position: relative;
        bottom: 0.1rem;
      `}
    >
      {initialArray?.map((singleValue, index) => {
        return (
          <Star
            singleValue={singleValue}
            webSize={webSize}
            mobileSize={mobileSize}
            key={`singleStar${index}`}
          />
        );
      })}
    </div>
  );
};

export default StarRankGroup;






// ------------------------------------------


import Rating from "react-rating";
import starFull from "../../assets/icons/star_full";
import starEmpty from "../../assets/icons/star_empty";
import { css } from "@emotion/react";
import { mobileBreakPoint } from "../../Constant";

const RatingStar = ({ initialRating, readonly, sizeMobile, sizeWeb }) => {
  const reviewStarStyle = css`
    @media (min-width: ${mobileBreakPoint}px) {
      width: ${sizeWeb}px;
      height: ${sizeWeb}px;
      margin: 0 0.125rem;
    }

    @media (max-width: ${mobileBreakPoint - 1}px) {
      width: ${sizeMobile}px;
      height: ${sizeMobile}px;
      margin: 0 0.1rem;
    }
  `;

  return (
    <Rating
      readonly={readonly}
      initialRating={initialRating}
      emptySymbol={<img src={starEmpty} css={reviewStarStyle} />}
      fullSymbol={<img src={starFull} css={reviewStarStyle} />}
    />
  );
};

export default RatingStar;

