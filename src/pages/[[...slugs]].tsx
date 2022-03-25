import { GetServerSideProps, NextPage } from "next";
import { RootMain } from "../RootMain";
import { MAIN_PAGES, MainPageType } from "../common/utils/mainPages";

const Home: NextPage<{ pageType: MainPageType }> = ({ pageType }) => {
  return <RootMain pageType={pageType} />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let pageType: MainPageType = 0;
  // TODO: テスト書く
  switch (ctx.req.url?.split("?")[0]) {
    case "/":
      pageType = MAIN_PAGES["ABOUT_ME"];
      break;
    case "/resume":
      pageType = MAIN_PAGES["RESUME"];
      break;
    case "/portfolio":
      pageType = MAIN_PAGES["PORTFOLIO"];
      break;
    case "/blog":
      pageType = MAIN_PAGES["BLOG"];
      break;

    default:
      return { notFound: true };
  }

  return { props: { pageType } };
};
