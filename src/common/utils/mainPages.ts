import React from "react";
import { About } from "../../about/components/About";
import { aboutData, portfolioData, resumeData } from "../../_data";
import { Data } from "../../domain";
import { Portfolio } from "../../portfolio/components/Portfolio";
import { Resume } from "../../resume/components/Resume";
import { Blog } from "../../blog/components/Blog";

export const MAIN_PAGES = {
  ABOUT_ME: 0,
  RESUME: 1,
  PORTFOLIO: 2,
  BLOG: 3,
} as const;

let pageList: {
  name: string;
  data: Data;
  component: React.FC<{ data: Data }>;
  path: string;
}[] = [];
pageList[MAIN_PAGES["ABOUT_ME"]] = {
  name: "about me",
  data: aboutData,
  component: About,
  path: "/",
};
pageList[MAIN_PAGES["RESUME"]] = {
  name: "resume",
  data: resumeData,
  component: Resume,
  path: "/resume",
};
pageList[MAIN_PAGES["PORTFOLIO"]] = {
  name: "portfolio",
  data: portfolioData,
  component: Portfolio,
  path: "/portfolio",
};
pageList[MAIN_PAGES["BLOG"]] = {
  name: "blog",
  data: portfolioData,
  component: Blog,
  path: "/blog",
};

export const PAGE_LIST = pageList;

export type MainPageType = typeof MAIN_PAGES[keyof typeof MAIN_PAGES];

export const END_PAGE: MainPageType = (Object.keys(MAIN_PAGES).length -
  1) as MainPageType;

export const GetPageNameFromPageType = (
  pageType: MainPageType
): keyof typeof MAIN_PAGES => {
  return Object.keys(MAIN_PAGES)[pageType] as keyof typeof MAIN_PAGES;
};
