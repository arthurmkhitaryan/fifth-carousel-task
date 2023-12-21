import { useEffect, useState, useCallback, useRef } from "react";
import { CarouselItemsType, CarouselHook, CarouselHookProps } from "./types";

const useCarousel = (
  items: CarouselItemsType,
  {
    autoSlide = false,
    loop = true,
    visibleItemsCount = 4,
  }: CarouselHookProps
): CarouselHook => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [slicedItems, setSlicedItems] = useState<string[]>([]);
  const [remainingItems, setRemainingItems] = useState<string[]>([]);
  const [loadedItems, setLoadedItems] = useState<number[]>([]);
  const maxIndex = items.length - 1;
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const restartTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (autoSlide) {
      intervalRef.current = setInterval(() => {
        handleSlideRight();
      }, 3000);
    }
  }, [autoSlide]);


  const handleSlideRight = useCallback(() => {
    restartTimer();
    setVisibleIndex((prevIndex) =>
      prevIndex === maxIndex ? (loop ? 0 : prevIndex) : prevIndex + 1
    );
  }, [loop, maxIndex]);

  const handleSlideLeft = () => {
    restartTimer();
    setVisibleIndex((prevIndex) =>
      prevIndex === 0 ? (loop ? maxIndex : prevIndex) : prevIndex - 1
    );
  };


  useEffect(() => {
    restartTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [restartTimer]);

  useEffect(() => {
    setSlicedItems(items.slice(visibleIndex, visibleIndex + visibleItemsCount));

    const remainingCount = visibleItemsCount - slicedItems.length;
    const newRemainingItems = items.slice(0, remainingCount);

    setRemainingItems(newRemainingItems);
  }, [visibleIndex, items, visibleItemsCount, slicedItems.length]);

  const handleVisibleItemClick = (index: number) => {
    restartTimer();

    const newIndex = visibleIndex + index;
    if (newIndex < items.length) {
      setVisibleIndex(newIndex);
    } else {
      setVisibleIndex(newIndex - items.length);
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute("data-index") || "0", 10);
        setLoadedItems((prevItems) => [...prevItems, index]);
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sliderRef.current) {
      sliderRef.current.querySelectorAll("img").forEach((img, index) => {
        observer.observe(img);
        img.setAttribute("data-index", index.toString());
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    visibleIndex,
    slicedItems,
    remainingItems,
    loadedItems,
    handleSlideLeft,
    handleSlideRight,
    handleVisibleItemClick,
    sliderRef,
  };
};

export default useCarousel;
