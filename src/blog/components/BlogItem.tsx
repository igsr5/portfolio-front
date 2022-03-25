import React, { forwardRef } from "react";

import { CategoryDataType, MediaItemType } from "../../domain";
import { useRenderBlogItem } from "../hooks/useRenderBlogItem";

type Props = { mediaItem: MediaItemType; categoryData: CategoryDataType[] };

export const BlogItem: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  useRenderBlogItem
);
