import Head from 'next/head';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import InvisibleBanner from '@components/ui/bodykore/Banners/InvisibleBanner';
import Slider from '@components/ui/bodykore/Sliders/Slider';
import HomeSection1 from '@components/ui/bodykore/Sections/HomeSection1';
import HomeSection2 from '@components/ui/bodykore/Sections/HomeSection2';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import OneReview from '@components/ui/bodykore/Sections/AboutSection4';
import HomeSection3 from '@components/ui/bodykore/Sections/HomeSection3';
import Footer from '@components/Footer';
import Header from '@components/Header';
import useWindowSize from '@lib/hooks/use-window-size';
import { GetStaticProps } from 'next';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import routes from '@config/routes';
import {
  CMSCollectionPage,
  Faqs,
  getCMSCollectionPage,
  getFaqs,
} from 'services/graphCMS';
import {
  getShopifyCollectionPage,
  ShopifyCollectionPage,
} from 'services/shopify/storefront';
import { getHomeReviews, Review } from 'services/stamped';
import { divide } from 'lodash';
import { NextSeo } from 'next-seo'
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getStaticProps: GetStaticProps = async (context) => {
  const header = await getHeader();
  const shopifyData = await getShopifyCollectionPage('packages');
  const CMSData = await getCMSCollectionPage('packages');
  const faqs = await getFaqs();
  const reviews = await getHomeReviews();

  return {
    props: { header, CMSData, faqs, shopifyData, reviews },
    revalidate: 30 * 60,
  };
};

interface HomeParams {
  header: HeaderData;
  CMSData: CMSCollectionPage;
  faqs: Faqs;
  shopifyData: ShopifyCollectionPage;
  reviews: Review[];
}

export default function Home({
  header,
  CMSData,
  faqs,
  shopifyData,
  reviews,
}: HomeParams) {
  const mapProjects = () => {
    return CMSData.projectCategories.map((item) => ({
      url: item.projects[0].image[0].url,
      title: item.title,
      link: `${routes.portfolio.path}/${item.projects[0].slug}`,
    }));
  };

  const mapCollections = () => {
    return header.categories.map((item) => ({
      url: item.image,
      topTitle: item.title,
      title: item.title,
      link: `${routes.collection.path}/${item.slug}`,
    }));
  };

  const mapPackages = () => {
    return shopifyData.products.edges.map((item) => ({
      url: item.node.featuredImage?.url,
      downTitle: item.node.title,
      title: item.node.title,
      link: `${routes.products.path}/${item.node.handle}`,
    }));
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;
  
  return (
    <>
      <SeoHeader seo={seo.home} />

      <Header productCat={header.categories} dynamicPages={header.pages} />
      <div>
        {/*<Head>
          <title>BodyKore Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>*/}
        <main className="w-full">
          <MainBanner
            title={'TURNKEY HOME GYM SYSTEM'}
            bgImage={'/frontPage/mainImage.jpg'}
            buttonsText={[
              {
                text: 'SEE ALL PACKAGES',
                color: 'transparent',
                link: `${routes.collection.path}/packages`,
              },
            ]}
            width='w-3/4'
          />

          <HomeSection1
            options={[
              {
                icon: '/svg/characteristics1.svg',
                title: 'AS LOW AS 0% APR FINANCING',
                description: 'From Affirm.',
              },
              {
                icon: '/svg/characteristics2.svg',
                title: 'EASY ASSEMBLY',
                description: 'Professional installation not required.',
              },
              {
                icon: '/svg/characteristics3.svg',
                title: 'WARRANTY INCLUDED',
                description: 'Conditions may apply.',
              },
              {
                icon: '/svg/characteristics4.svg',
                title: 'NATIONWIDE SHIPPING',
                description: 'Lorem ipsum dolor',
              },
            ]}
          />

          <InvisibleBanner height="h-24" id="belowBanner" />

          <div>
            {(() => {
              if (widthSize !== undefined && widthSize >= 900) {
                return (
                  <div className="pt-10 px-8">
                    <Slider
                      title1="FIND A PACKAGE THAT MEETS YOUR"
                      color1="text-black-373933"
                      title2="NEEDS"
                      color2="text-red-bc2026"
                      description="With multiple options to choose from, BodyKore’s premier selection of exercise and home gym equipment comes in a variety of different combinations all suited to your fitness needs. Whether you’re low on space, or are looking to fill a larger area, BodyKore has a Package that’s best-suited for your home."
                      btnText="SEE ALL PACKAGES"
                      border="border"
                      btnBorder="border-black-373933"
                      link={`${routes.collection.path}/packages`}
                      bgImage={mapPackages()}
                      height="h-64"
                    />
                  </div>
                );
              } else {
                return (
                  <div className="pt-10 px-8">
                    <SliderProgress
                      title1={'FIND A PACKAGE THAT MEETS YOUR'}
                      title2={'NEEDS'}
                      color1={'text-black-373933'}
                      color2={'text-red-bc2026'}
                      description="With multiple options to choose from, BodyKore’s premier selection of exercise and home gym equipment comes in a variety of different combinations all suited to your fitness needs. Whether you’re low on space, or are looking to fill a larger area, BodyKore has a Package that’s best-suited for your home."
                      btnText="SEE ALL PACKAGES"
                      link={`${routes.collection.path}/packages`}
                      bgImage={mapPackages()}
                      gap="gap-8"
                      textPosition="text-center"
                      pb="py-8"
                    />
                  </div>
                );
              }
            })()}
          </div>

          <div>
            {(() => {
              if (widthSize !== undefined && widthSize >= 900) {
                return (
                  <div className="py-44 px-8">
                    <Slider
                      title1="ALL"
                      color1="text-red-bc2026"
                      title2="PRODUCTS"
                      color2="text-black-373933"
                      description="From cable machines to dumbbells and everything in between, BodyKore’s extensive product lines have machines, equipment, and more for every type of fitness training."
                      btnText="SEE ALL PRODUCTS"
                      btnBorder="border-black-373933"
                      border="border"
                      link={routes.products.path}
                      bgImage={mapCollections()}
                    />
                  </div>
                );
              } else {
                return (
                  <div className="py-32 md:py-44 px-8">
                    <SliderProgress
                      title1={'ALL'}
                      title2={'PRODUCTS'}
                      color1={'text-red-bc2026'}
                      color2={'text-black-373933'}
                      description="From cable machines to dumbbells and everything in between, BodyKore’s extensive product lines have machines, equipment, and more for every type of fitness training."
                      btnText="SEE ALL PRODUCTS"
                      link={routes.products.path}
                      bgImage={mapCollections()}
                      gap="gap-8"
                      pb="py-8"
                    />
                  </div>
                );
              }
            })()}
          </div>

          <HomeSection2
            title1="BENEFITS"
            title2="OF OWNING A HOME GYM"
            description="With multiple options to choose from, BodyKore’s premier selection of exercise and home gym equipment comes in a variety of different combinations all suited to your fitness needs."
            options={[
              {
                icon: '/svg/benefits1.svg',
                title: 'TIME SAVING',
              },
              {
                icon: '/svg/benefits2.svg',
                title: 'COMFORTABLE',
              },
              {
                icon: '/svg/benefits3.svg',
                title: 'CLEAN',
              },
              {
                icon: '/svg/benefits4.svg',
                title: 'INCREASE IN PROPERTY VALUE',
              },
              {
                icon: '/svg/benefits5.svg',
                title: 'PRIVACY',
              },
            ]}
          />

          <div className="py-28 px-8">
            <SliderProgress
              title1={'GET'}
              title2={'INSPIRATION'}
              color1={'text-red-bc2026'}
              color2={'text-black-373933'}
              btnText="PORTFOLIO"
              link={routes.portfolio.path}
              bgImage={mapProjects()}
              width="w-1/2"
            />
          </div>

          {reviews.length !== 0 ? (
            <div className="px-8">
              <OneReview
                img="/frontPage/Review.jpg"
                reviews={reviews}
              />
            </div>
          ) : null}

          <div className="py-52">
            <HomeSection3
              title1="FREQUENTLY ASKED"
              title2="QUESTIONS"
              accordion={faqs.faqs.map((item) => ({
                question: item.question,
                answer: item.answer,
                type: item.faqType?.name,
              }))}
              filter={faqs.faqTypes.map((item) => item.name)}
            />
          </div>
        </main>
      </div>
      <Footer productCat={header.categories} />
    </>
  );
}
