export interface CarouselProps {
    items: CarouselItemsType;
    visibleItemsCount?: number;
    autoSlide?: boolean;
    loop?: boolean;
    controls?: boolean;
} 

export type CarouselItemsType = string[];

export interface CarouselHookProps {
    autoSlide?: boolean;
    loop?: boolean;
    visibleItemsCount?: number;
}
  
export interface CarouselHook {
    visibleIndex: number;
    slicedItems: string[];
    remainingItems: string[];
    loadedItems: number[];
    handleSlideLeft: () => void;
    handleSlideRight: () => void;
    handleVisibleItemClick: (index: number) => void;
    sliderRef: React.MutableRefObject<HTMLDivElement | null>;
}