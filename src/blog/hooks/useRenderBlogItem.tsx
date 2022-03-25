import React from "react";
import Image from "next/image";
import { getCategoryName } from "../../common/utils/getCategoryName";
import { CategoryDataType, MediaItemType } from "../../domain";

export const useRenderBlogItem = (
  {
    mediaItem: blogItem,
    categoryData,
  }: { mediaItem: MediaItemType; categoryData: CategoryDataType[] },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) => {
  return (
    <div className="mx-auto rounded border border-grey-4" ref={ref}>
      <a className="flex h-full flex-col items-stretch">
        <Image
          src={blogItem.thumbnailUrl}
          alt={blogItem.title}
          className="h-full w-full object-cover transition hover:opacity-50"
          width={320}
          height={200}
        />
        <div className="px-10 py-7 text-center">
          <h3 className="font-japanese text-sm tracking-wider text-navy">
            {blogItem.title}
          </h3>
          <p className="uppercase text-grey-2" style={{ fontSize: "13px" }}>
            {getCategoryName(blogItem.categoryID, categoryData)}
          </p>
        </div>
      </a>
    </div>
  );
};
