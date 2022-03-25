import { AboutData } from "./about";
import { PortfolioData } from "./portfolio";
import { ResumeData } from "./resume";

export type Data = AboutData | ResumeData | PortfolioData;

export * from "./header";
export * from "./about";
export * from "./resume";
export * from "./portfolio";
export * from "./post";
