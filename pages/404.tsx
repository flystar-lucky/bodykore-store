import type { GetStaticPropsContext } from 'next';
import { Text } from '@components/ui/base';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetStaticProps } from 'next';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import { DefaultSeo } from 'next-seo';

export const getStaticProps: GetStaticProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
    revalidate: 30 * 60,
  };
};

// export async function getStaticProps({
//   preview,
//   locale,
//   locales,
// }: GetStaticPropsContext) {
//   const config = { locale, locales }
//   return {
//     props: {},
//     revalidate: 200,
//   }
// }

interface NotFoundParams {
  header: HeaderData;
}

export default function NotFound({ header }: NotFoundParams) {
  return (
    <>
      <DefaultSeo
          title="Default Title"
          description="Default description goes here."
          noindex={true}
      />
      
      <Header productCat={header.categories} dynamicPages={header.pages} />
      <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
        <Text variant="heading">Not Found</Text>
        <Text className="">
          The requested page doesn't exist or you don't have access to it.
        </Text>
      </div>
      <Footer productCat={header.categories} />
    </>
  );
}
