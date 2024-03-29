import React, { useEffect, useMemo, useRef, useState } from "react";
import type CoreSwiper from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { captureException } from "@sentry/nextjs";
import useSwr from "swr";

import { END_PAGE, MainPageType, mainPageList } from "./common/utils/mainPages";
import { Header } from "./header/components/Header";
import { SwiperOverlay } from "./common/components/SwiperOverlay";
import { aboutData, headerData, portfolioData, resumeData } from "./_data";
import { BlogData, Data } from "./domain";
import { axiosClient } from "./axios_client";

export const RootMain: React.FC<{
  pageType: MainPageType;
  blogData: BlogData;
}> = (props) => {
  const [swiper, setSwiper] = useState<CoreSwiper | undefined>(undefined);
  const [tabSwiper, setTabSwiper] = useState<CoreSwiper | undefined>(undefined);

  const slideStatus = useRef<{ prev: number; current: number }>({
    prev: 0,
    current: 0,
  });

  const onMainSlideChange = (swiper: CoreSwiper) => {
    slideStatus.current = {
      prev: slideStatus.current.current,
      current: swiper.realIndex,
    };
    const op = checkSlideMove(slideStatus.current);
    tabSlideMove(op, tabSwiper);
  };

  const isWindowMd = useMediaQuery({ query: "(min-width: 768px)" });
  const swiperGeneralProps: SwiperProps = {
    slidesPerView: "auto",
    spaceBetween: isWindowMd ? 50 : 10,
    loopedSlides: 4,
    loop: true,
    speed: 500,
    centeredSlides: true,
  };

  const moveSlide = (isNext: boolean, isPrev: boolean) => {
    isNext ? swiper?.slideNext() : isPrev ? swiper?.slidePrev() : null;
  };

  const mainPageData: Record<string, Data> = useMemo(() => {
    return {
      about: aboutData,
      resume: resumeData,
      portfolio: portfolioData,
      blog: props.blogData,
    };
  }, [props.blogData]);

  // TODO
  // thumbnail_url を s3 にアップロードし直す
  const { data, error } = useSwr("/api/blogs", axiosClient);
  if (data?.data.blogs) {
    (mainPageData.blog as BlogData).blogItems = data?.data.blogs ? data?.data.blogs : mainPageData.blog;
  }
  if (error) captureException(error);

  // swiper の描画にラグがあるため、完全にレンダリングが終わるまでloadingを表示する
  // (一瞬なので真っ白な画面にしている)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    return;
  }, []);

  return (
    <div className={loading ? "fixed bottom-0" : ""}>
      {loading && <div className="fixed top-0 left-0 z-50 h-full w-full bg-white"></div>}
      <Header
        headerData={headerData}
        swiperGeneralProps={swiperGeneralProps}
        pageType={props.pageType}
        setTabSwiper={setTabSwiper}
        moveSlide={moveSlide}
      />
      <Swiper
        {...swiperGeneralProps}
        initialSlide={props.pageType}
        onInit={(swiper: CoreSwiper) => setSwiper(swiper)}
        onSlideChange={onMainSlideChange}
        className="pt-3"
      >
        {mainPageList.map((v, i) => (
          <SwiperSlide style={{ width: "85%" }} key={i}>
            {(props) => (
              <>
                <SwiperOverlay {...props} moveSlide={moveSlide} />
                {v.component({ data: mainPageData[v.name] })}
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// どの方向にスライドが動いたか
const checkSlideMove: (status: { prev: number; current: number }) => "NOOP" | "NEXT" | "PREV" = ({ prev, current }) => {
  if (prev === current) {
    return "NOOP";
  }

  if (current === 0 && prev === END_PAGE) {
    return "NEXT";
  }

  if (current === END_PAGE && prev === 0) {
    return "PREV";
  }

  if (current > prev) {
    return "NEXT";
  } else {
    return "PREV";
  }
};

const tabSlideMove = (op: "NOOP" | "NEXT" | "PREV", tabSwiper?: CoreSwiper) => {
  switch (op) {
    case "NEXT":
      tabSwiper?.slideNext();
      break;
    case "PREV":
      tabSwiper?.slidePrev();
      break;
    default:
    // noop
  }
};
