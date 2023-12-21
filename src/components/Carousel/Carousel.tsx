import React from "react";

//hooks
import useCarousel from "./useCarousel";

//types
import { CarouselProps } from "./types";

//styles & images
import * as S from "./Carousel.styled";
import { ReactComponent as LeftArrowSVG } from "../../assets/images/arrow-left.svg"
import { ReactComponent as RightArrowSVG } from "../../assets/images/arrow-right.svg"

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoSlide = false,
  loop = true,
  visibleItemsCount = 4,
  controls = true
}) => {
    const {
        visibleIndex,
        slicedItems,
        remainingItems,
        loadedItems,
        handleSlideLeft,
        handleSlideRight,
        handleVisibleItemClick,
        sliderRef,
      } = useCarousel(items, { autoSlide, loop, visibleItemsCount });

  return (
    <S.CarouselWrapper ref={sliderRef}>
      <S.Container>
        <S.MainImage>
          <img
            src={items[visibleIndex]}
            alt={`item-${visibleIndex}`}
            className={loadedItems.includes(visibleIndex) ? "active" : ""}
          />
        </S.MainImage>
        <S.VisibleItems>
          {slicedItems.map((item, index) => (
            <S.VisibleItem
              key={item + index}
              onClick={() => handleVisibleItemClick(index)}
            >
              <img
                src={item}
                alt={`item-${index}`}
                className={index === 0 ? "active" : "non-active"}
              />
            </S.VisibleItem>
          ))}
          {remainingItems.map((item, index) => (
            <S.VisibleItem
              key={item + index}
              onClick={() => handleVisibleItemClick(slicedItems.length + index)}
            >
              <img
                src={item}
                alt={`item-${slicedItems.length + index}`}
                className={loadedItems.includes(slicedItems.length + index) ? "active" : ""}
              />
            </S.VisibleItem>
          ))}
        </S.VisibleItems>
        {controls && <S.Navigation>
            <S.NavigateButton id="left-btn" onClick={handleSlideLeft}>
                <LeftArrowSVG />
            </S.NavigateButton>
            <S.NavigateButton id="right-btn" onClick={handleSlideRight}>
            <RightArrowSVG />
            </S.NavigateButton>
        </S.Navigation>}
      </S.Container>
    </S.CarouselWrapper>
  );
};

export default Carousel;
