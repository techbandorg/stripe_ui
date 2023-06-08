// " use client";
import "../../src/app/globals.css";

import { getPlatform } from "../../Api/api";

import { removeImageLinksFromMarkdown } from "../../lib/removeImageLinksFromMarkdown";

import PageContainer from "../../components/PageContainer/PageWrapper";
import CustomPlatfromsMarkdown from "../../components/CustomMarkdown/CustomPlatfromsMarkdown";
import Footer from "../../components/footer/footer";

import st from "./index.module.css";

export async function getStaticProps() {
  try {
    const response = await getPlatform();
    const transformData = response?.map((item: IItem) => ({
      services: item?.attributes?.services,
      summary: item?.attributes?.summary
        ? removeImageLinksFromMarkdown(item.attributes.summary)
        : null,
      id: item?.id,
    }));

    return {
      props: {
        platforms: transformData,
      },
    };
  } catch (error) {
    console.error("getStaticProps ERROR", error);
    return {
      props: {
        platforms: [],
      },
    };
  }
}

const AllPlatforms = ({ platforms }: { platforms: IPlatfrom[] }) => {
  return (
    <>
      <PageContainer title={"All Case Studies"} isArrow={true}>
        <p className={st.desc}>
          Discover how we develop sophisticated, user-friendly blockchain
          solutions for clients in various industries. These projects showcase
          our commitment to building top-notch applications that help businesses
          succeed and contribute to the broader adoption of blockchain.
        </p>
        <div className={st.container}>
          {platforms
            ?.sort((a: IPlatfrom, b: IPlatfrom) => a.id - b.id)
            .map((el) => (
              <div key={el?.id} className={st.content}>
                <CustomPlatfromsMarkdown
                  technology={el?.services}
                  platfromId={el?.id}
                >
                  {el?.summary}
                </CustomPlatfromsMarkdown>
              </div>
            ))}
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default AllPlatforms;
