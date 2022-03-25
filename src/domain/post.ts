export type FeedSource = {
  sources?: string[];
  includeUrlRegex?: string;
  excludeUrlRegex?: string;
};

export type PostItem = {
  title: string;
  link: string;
  thumbnailUrl?: string;
  isoDate?: string;
};
