import { BlogData, BlogItemType, CATEGORY } from "../domain/blog";

export const portfolioData: BlogData = {
  categoryData: [
    {
      name: "all",
      id: -1,
    },
    {
      name: "backend",
      id: CATEGORY["BACKEND"],
    },
    {
      name: "frontend",
      id: CATEGORY["FRONTEND"],
    },
    {
      name: "infrastructure",
      id: CATEGORY["INFRASTRUCTURE"],
    },
    {
      name: "coding",
      id: CATEGORY["CODING"],
    },
  ],
  blogItems: [
    {
      id: 0,
      title: "wantedly.com を Next.js に移行した話",
      categoryID: CATEGORY["FRONTEND"],
      thumbnailUrl: "https://images.igsr5.com/l/fljdfgk.jpeg",
      devDate: new Date("2021-08"),
      tags: ["TypeScript", "Next.js", "React"],
      externalUrl:
        "https://www.wantedly.com/companies/wantedly/post_articles/359076",
    },
    {
      id: 1,
      title: "五目並べアプリ",
      categoryID: CATEGORY["FRONTEND"],
      thumbnailUrl: "https://images.igsr5.com/l/ngmpRo2.png",
      devDate: new Date("2021-06"),
    },
    {
      id: 2,
      title: "ポートフォリオサイト",
      categoryID: CATEGORY["FRONTEND"],
      thumbnailUrl: "https://images.igsr5.com/l/afjife.png",
      devDate: new Date("2022-02"),
    },
  ].sort((a, b) => {
    if (a.devDate > b.devDate) {
      return -1;
    } else if (a.devDate === b.devDate) {
      return 0;
    } else {
      return 1;
    }
  }) as BlogItemType[],
};
