import Footer from '@components/Footer';
import Header from '@components/Header';
import SeoHeader from '@components/seoHeader';
import InvisibleBanner from '@components/ui/bodykore/Banners/InvisibleBanner';
import SellCards, { CardProps } from '@components/ui/bodykore/Cards/SellCards';
import Image from '@components/ui/bodykore/Image';
import BlackNavOptions from '@components/ui/bodykore/NavOptions/BlackNavOptions';
import SwitchPagesOptions, {
  OptionProps,
} from '@components/ui/bodykore/NavOptions/SwitchPagesOptions';
import Factors from '@components/ui/bodykore/Sections/Factors';
import ImgDescription from '@components/ui/bodykore/Sections/ImgDescription';
import SingleProduct from '@components/ui/bodykore/Sections/Product';
import ReviewForm from '@components/ui/bodykore/Sections/ReviewForm';
import Reviews from '@components/ui/bodykore/Sections/Reviews';
import ImgPagSlider from '@components/ui/bodykore/Sliders/ImgPagSlider';
import Slider from '@components/ui/bodykore/Sliders/Slider';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import PlainList from '@components/ui/bodykore/Text/PlainList';
import PlainText from '@components/ui/bodykore/Text/PlainText';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import routes from '@config/routes';
import useWindowSize from '@lib/hooks/use-window-size';
import { getHeader, HeaderData } from '@utils/header';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { CMSCollectionPage, getCMSCollectionPage } from 'services/graphCMS';
import {
  getAllProductsSlug,
  getProduct,
  getProductRecommendations,
  Product,
  ProductInfo,
} from 'services/shopify/storefront';
import { getReviewsOfProduct, Review } from 'services/stamped';
import seo from "../../../public/SEO/en.json";

export const getStaticPaths = async () => {
  const products = await getAllProductsSlug();

  const paths = products
    .map((item) => ({ params: { slug: item.node.handle } }))
    .flat();

  return {
    paths: [...paths],
    fallback: 'blocking',
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const product = await getProduct(slug as string);

  if (product === undefined) {
    return {
      notFound: true,
    };
  }

  const header = await getHeader();
  let CMSData;
  if (product.collections.edges.length !== 0) {
    CMSData = await getCMSCollectionPage(
      product.collections.edges[0].node.handle
    );
  }

  const productIdDecoded = Buffer.from(product.id, 'base64').toString();
  const productId = productIdDecoded.slice(
    productIdDecoded.lastIndexOf('/') + 1
  );
  const reviews = await getReviewsOfProduct(productId);
  const recommendations = await getProductRecommendations(product.id);

  return {
    props: {
      product,
      reviews,
      recommendations,
      header,
      CMSData,
      productId,
    },
    revalidate: 30 * 60,
  };
};

interface ProductPageParams {
  product: Product;
  reviews: Review[] | undefined;
  recommendations: ProductInfo[];
  header: HeaderData;
  CMSData: CMSCollectionPage | undefined;
  productId: string;
}

const ProductPage = ({
  product,
  reviews,
  recommendations,
  header,
  CMSData,
  productId,
}: ProductPageParams) => {
  const mapImages = () => {
    return product.images.edges.map((item) => ({
      url: item.node.url,
      btn3d: true,
    }));
  };

  const getRating = () => {
    if (reviews === undefined || reviews.length === 0) {
      return 0;
    }
    let sum = 0;
    for (let review of reviews) {
      sum += review.reviewRating;
    }
    return sum / reviews.length;
  };

  const mapOptions = () => {
    return product.variants.edges.map((item) => ({
      title: item.node.title,
      id: item.node.id,
      price: item.node.priceV2.amount,
      prevPrice: item.node.compareAtPriceV2?.amount,
      img: item.node.image?.url,
      available: item.node.availableForSale,
    }));
  };

  const mapReviews = () => {
    return (reviews || []).map((item, index) => ({
      id: item.id,
      name: item.author,
      rating: item.reviewRating,
      title: item.reviewTitle,
      date: item.reviewDate,
      description: item.reviewMessage,
      numLikes: item.reviewVotesUp,
      numDislikes: item.reviewVotesDown,
    }));
  };

  const scrollDown = () => {
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const mapProducts = (): CardProps[] => {
    return recommendations.map((item) => ({
      id: item.variants.edges[0].node.id,
      slug: item.handle,
      bgImg: item.featuredImage?.url,
      title: item.title,
      price: item.variants.edges[0].node.priceV2.amount,
      comparePrice: item.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.description,
      available: item.availableForSale,
    }));
  };

  // Only call if CMSData is not undefined, the product belogs to a collection,
  // and it is not 'Packages', as there are no subcategorization.
  const mapSubcategories = () => {
    return [];
    return CMSData!.category!.subcategories.map((item) => ({
      url: item.image?.url,
      topTitle: item.name,
      title: item.name,
      link: `${routes.products.path}?category=${product.collections.edges[0].node.title}&subcategory=${item.name}`,
    }));
  };

  const switchPage: OptionProps[] = [
    {
      icon: '/svg/home.svg',
      text: 'Products',
      arrow: '/svg/rightArrow.svg',
      link: routes.products.path,
    },
  ];
  if (product.collections.edges.length !== 0) {
    switchPage.push({
      text: product.collections.edges[0].node.title,
      arrow: '/svg/rightArrow.svg',
      link: `${routes.collection.path}/${product.collections.edges[0].node.handle}`,
    });
  }
  if (product.productType !== '') {
    switchPage.push({
      text: product.productType,
      arrow: '/svg/rightArrow.svg',
      link: `${routes.products.path}?category=${product.collections.edges[0].node.title}&subcategory=${product.productType}`,
    });
  }
  switchPage.push({
    text: product.title,
  });

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;

  const keyPerformanceFactors = product.keyFactor?.value.split(',');

  const mapHighlights = () => {
    if (!product.highList || !product.highImages) {
      return [];
    }
    const highList = product.highList?.value.split(',');
    return product.highImages?.value.split(',').map((item, index) => ({
      img: item,
      description: highList[index] || '',
    }));
  };
  // dynamically change seo title
  const dinamycSeo = () => {
    return seo.singleProduct;
  }

  return (
    <>
      <SeoHeader seo={dinamycSeo()} />
      <Header productCat={header.categories} dynamicPages={header.pages} />
      <section className="w-full">
        <div className="pb-10 px-6">
          <SwitchPagesOptions options={switchPage} />
        </div>

        {/*PRODUCT SECTION*/}
        <div className="pb-4 px-6 max-w-7xl m-auto">
          <Blacktitle
            title={product.title}
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="flex lg:flex-row flex-wrap justify-center md:justify-start max-w-7xl m-auto px-6">
          <div className="md:w-1/2 w-96 pr-8">
            <ImgPagSlider
              bgImage={[
                {
                  url: '/Product/ProdSlider1.jpg',
                },
                {
                  url: '/Product/ProdSlider2.png',
                },
                {
                  url: '/Product/ProdSlider3.png',
                },
                {
                  url: '/Product/ProdSlider4.png',
                },
              ]}
              //bgImage={mapImages()}
            />
          </div>

          <div className="md:w-1/2 w-96">
            <SingleProduct
              affirmMonthly="$60/mo"
              affirmTax="at 0%"
              affirmLogo="/Product/affirm.jpg"
              rating={getRating()}
              numReviews={reviews?.length || 0}
              description={product.description}
              shippingCost="* Estimated Shipping cost: $???.00"
              options={mapOptions()}
              reviewOnClick={scrollDown}
            />

            <div className="pt-8 flex flex-wrap justify-center pb-5">
              <Factors
                textSize="text-xs"
                factors={[
                  {
                    icon: '/Product/warranty.jpg',
                    title: '10-YEAR INDUSTRY LEADING WARRANTY',
                    description: 'Conditions may apply.',
                  },
                  {
                    icon: '/Product/commercial.jpg',
                    title: 'COMMERCIAL GRADE EQUIPMENT',
                    description: 'Lorem ipsum',
                  },
                  {
                    icon: '/Product/assembly.jpg',
                    title: 'EASY ASSEMBLY',
                    description: 'Professional installation not required.',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/*NAV OPTIONS SECTION*/}
        <div className="pb-28'">
          <BlackNavOptions
            height="h-fit"
            options={[
              {
                icon: '/svg/paper.svg',
                text: 'Description',
                id: 'description',
              },
              {
                icon: '/svg/highlight.svg',
                text: 'Highlights',
                id: 'highlights',
              },
              {
                icon: '/svg/key.svg',
                text: 'Key Performance Factors',
                id: 'key',
              },
              {
                icon: '/svg/paper.svg',
                text: 'Specifications',
                id: 'specifications',
              },
              {
                icon: '/svg/reviewStar.svg',
                text: 'Reviews',
                id: 'reviews',
              },
            ]}
          />
        </div>

        <InvisibleBanner height="h-28" id="description" />

        {/*DESCRIPTION SECTION*/}
        <div className="max-w-7xl m-auto px-8 flex justify-center lg:justify-start">
          <Blacktitle
            title="DESCRIPTION"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="flex flex-row flex-wrap justify-center max-w-7xl m-auto pb-20 gap-4 px-8">
          <div className="lg:w-2/4">
            <div className="py-5">
              <PlainText
                textColor="text-black-373933"
                textPosition="lg:text-left"
                paragraphs={[
                  {
                    description: product.descSummary?.value,
                  },
                ]}
              />
            </div>
            {product.descFeatures ? (
              <>
                <div className="pb-2">
                  <Blacktitle
                    title="FEATURES"
                    textSize="text-2xl"
                    textColor="text-red-bc2026"
                  />
                </div>

                <PlainList
                  textColor="text-black-1c2023"
                  List={product.descFeatures?.value
                    .split(',')
                    .map((item) => ({ text: item }))}
                />
              </>
            ) : null}
          </div>

          <div className="lg:w-2/4">
            <Image img={product.descImage?.value} buttons={[]} />
          </div>
        </div>

        <InvisibleBanner height="h-28" id="highlights" />

        {/*HIGHLIGHTS SECTION*/}
        <div className="flex justify-center pb-2">
          <Blacktitle
            title="HIGHLIGHTS"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        {/* <div className="pb-10 px-8">
          {product.highList ? (
            <div className="flex" style={{ paddingInline: '500px' }}>
              <PlainText
                textColor="text-black-373933"
                textPosition="lg:text-left"
                paragraphs={product.highList?.value.split(',').map((item) => ({
                  description: item,
                }))}
              />
            </div>
          ) : null}

          <div>
            <Image
              img={product.highImages?.value}
              buttons={
                [
                  // {
                  //   textBottomL: '1',
                  // },
                ]
              }
            />
          </div>
        </div> */}

        <div className="px-8 pt-10 pb-36">
          <ImgDescription
            imgHeight="h-72"
            imgWidth="w-72"
            textSize="text-sm"
            images={mapHighlights()}
          />
        </div>

        <InvisibleBanner height="h-28" id="key" />

        {/*KEY SECTION*/}
        <div className="pb-4 max-w-7xl m-auto px-8 flex justify-center lg:justify-start">
          <Blacktitle
            title="KEY PERFORMANCE FACTORS"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="py-20 px-8 flex justify-center">
          <Factors
            division="lg:divide-x divide-black-373933"
            textSize="text-lg"
            factors={[
              {
                icon: '/svg/warranty.svg',
                title: keyPerformanceFactors ? keyPerformanceFactors[0] : '',
              },
              {
                icon: '/svg/dollar.svg',
                title: keyPerformanceFactors ? keyPerformanceFactors[1] : '',
              },
              {
                icon: '/svg/assembly.svg',
                title: keyPerformanceFactors ? keyPerformanceFactors[2] : '',
              },
            ]}
            imgHeight="h-10 lg:h-16"
            imgWidth="h-10 lg:h-16"
          />
        </div>

        <InvisibleBanner height="h-28" id="specifications" />

        {/*SPECS SECTION*/}
        <div className="pb-4 max-w-7xl m-auto px-8 flex justify-center lg:justify-start">
          <Blacktitle
            title="SPECIFICATIONS"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="px-8 flex justify-center lg:justify-start">
          {product.specList ? (
            <PlainList
              textColor="text-black-373933"
              List={product.specList.value
                .split(',')
                .map((item) => ({ text: item }))}
            />
          ) : null}
          {product.specImages
            ? product.specImages.value
                .split(',')
                .map((item, index) => (
                  <Image key={index} img={item} buttons={[]} />
                ))
            : null}
        </div>

        <InvisibleBanner height="h-28" id="reviews" />

        {/*REVIEW SECTION*/}
        <div className="pb-4 max-w-7xl m-auto px-8">
          <Blacktitle
            title={`REVIEWS (${reviews?.length || 0})`}
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div>
          <Reviews reviews={mapReviews()} />
        </div>

        <div className="pt-20">
          <ReviewForm productId={productId} />
        </div>

        {/*SELLS CARDS SECTION*/}
        {recommendations.length > 0 ? (
          <div className="pb-4">
            <Blacktitle
              title="PRODUCT RECOMMENDATIONS"
              textSize="text-5xl"
              textColor="text-black-373933"
            />
            <SellCards gap="gap-12" cards={mapProducts()} />
          </div>
        ) : null}

        {/*SLIDER SECTION*/}

        <div className="py-32 px-8">
          {product.collections.edges.length !== 0 &&
          product.collections.edges[0].node.title !== 'Packages' &&
          CMSData !== undefined ? (
            <div>
              {(() => {
                if (widthSize !== undefined && widthSize >= 800) {
                  return (
                    <Slider
                      title1="ALL"
                      title2={product.collections.edges[0].node.title}
                      btnText={`SEE ALL ${product.collections.edges[0].node.title}`}
                      btnBorder="border-black-373933"
                      link={`${routes.products.path}?category=${product.collections.edges[0].node.title}`}
                      border="border-2"
                      bgImage={mapSubcategories()}
                    />
                  );
                } else {
                  return (
                    <SliderProgress
                      title1={'ALL'}
                      title2={product.collections.edges[0].node.title}
                      color1={'text-red-bc2026'}
                      color2={'text-black-373933'}
                      btnText={`SEE ALL ${product.collections.edges[0].node.title}`}
                      link={`${routes.products.path}?category=${product.collections.edges[0].node.title}`}
                      bgImage={mapSubcategories()}
                      gap="gap-20"
                      pb="py-4"
                    />
                  );
                }
              })()}
            </div>
          ) : null}
        </div>
      </section>
      <Footer productCat={header.categories} />
    </>
  );
};

export default ProductPage;
