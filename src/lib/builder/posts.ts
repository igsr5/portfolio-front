import fs from "fs-extra";
import Parser from "rss-parser";
import { feedSource } from "../../_data";
import { PostItem, FeedSource } from "../../domain";
export default {};

const parser = new Parser();
let allPostItems: PostItem[] = [];

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];

  // return item which has title and link
  return feed.items
    .map(({ title, enclosure, link, isoDate }) => {
      return {
        title,
        link,
        thumbnailUrl: enclosure?.url,
        isoDate: isoDate ? new Date(isoDate) : undefined,
      };
    })
    .filter(({ title, link }) => title && link) as PostItem[];
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: PostItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}

async function getMyFeedItems(feedSource: FeedSource): Promise<PostItem[]> {
  const { sources, includeUrlRegex, excludeUrlRegex } = feedSource;
  const feedItems = await getFeedItemsFromSources(sources);
  if (!feedItems) return [];

  let postItems = feedItems.map((item) => {
    return {
      ...item,
    };
  });
  // remove items which not matches includeUrlRegex
  if (includeUrlRegex) {
    postItems = postItems.filter((item) => {
      return item.link.match(new RegExp(includeUrlRegex));
    });
  }
  // remove items which matches excludeUrlRegex
  if (excludeUrlRegex) {
    postItems = postItems.filter((item) => {
      return !item.link.match(new RegExp(excludeUrlRegex));
    });
  }

  return postItems;
}

(async function () {
  const items = await getMyFeedItems(feedSource);
  if (items) allPostItems = [...allPostItems, ...items];
  fs.ensureDirSync("src/_data/.posts");
  fs.writeJsonSync("src/_data/.posts/posts.json", allPostItems);
})();
