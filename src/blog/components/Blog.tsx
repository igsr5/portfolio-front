import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { FaLeaf } from "react-icons/fa";

import { GlobalCenterHeading } from "../../common/components/GlobalCenterHeading";
import { CategoryType, Data, MediaItemType, PortfolioData } from "../../domain";
import { BlogItem } from "./BlogItem";

export const Blog: React.FC<{ data: Data }> = ({ data }) => {
  const portfolioData = data as PortfolioData;

  const [currentCategory, setCurrentCategory] = useState<CategoryType>(-1);
  const [visibleMediaData, setVisibleMediaData] = useState<MediaItemType[]>(
    portfolioData.mediaItems
  );

  const CategoryBtn: React.FC<{ text: string; id: CategoryType }> = ({
    text,
    id,
  }) => (
    <li
      className={`${
        id === currentCategory
          ? "border-navy  bg-navy text-white hover:text-white"
          : " border-grey-4  text-grey-2 hover:text-navy"
      } my-2.5 mx-1.5 cursor-pointer rounded border px-3 py-1.5 text-xs
       tracking-widest transition hover:border-navy`}
      onClick={() => setCurrentCategory(id)}
    >
      {text}
    </li>
  );

  // TODO: テスト書く
  useEffect(() => {
    setVisibleMediaData((): MediaItemType[] => {
      if (currentCategory === -1) return portfolioData.mediaItems;

      let tmp = portfolioData.mediaItems.map((v) => {
        if (v.categoryID === currentCategory) return v;
      });
      const newData = tmp.filter(Boolean);

      return newData as MediaItemType[];
    });
  }, [currentCategory, portfolioData.mediaItems]);

  return (
    <>
      <div className="my-3">
        <GlobalCenterHeading text="my blog" icon={FaLeaf} />
      </div>

      <div className="my-8 flex justify-center">
        <ul className="flex flex-wrap justify-center uppercase">
          {portfolioData.categoryData.map((v) => (
            <CategoryBtn text={v.name} id={v.id} key={v.id} />
          ))}
        </ul>
      </div>

      <FlipMove className="mb-8 grid grid-cols-1 gap-10 gap-y-10 px-2 sm:grid-cols-2 lg:grid-cols-3">
        {visibleMediaData.map((v) => (
          <BlogItem
            key={v.id}
            mediaItem={v}
            categoryData={portfolioData.categoryData}
          />
        ))}
      </FlipMove>
    </>
  );
};
