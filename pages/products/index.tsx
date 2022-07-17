import Footer from '@components/Footer';
import Header from '@components/Header';
import SeoHeader from '@components/seoHeader';
import FadingAndOptions from '@components/ui/bodykore/Banners/FadingAndOptions';
import TransparentBtn from '@components/ui/bodykore/Buttons/TransparentBtn';
import SellCards, { CardProps } from '@components/ui/bodykore/Cards/SellCards';
import CheckBox from '@components/ui/bodykore/CheckBox/CheckBox';
import ProductsDropdown from '@components/ui/bodykore/Dropdown/ProductsDropdown';
import SortBy from '@components/ui/bodykore/Dropdown/SortBy';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import { OptionProps } from '@components/ui/bodykore/NavOptions/SwitchPagesOptions';
import VFilterOptions from '@components/ui/bodykore/NavOptions/VFilterOptions';
import PriceRange from '@components/ui/bodykore/PriceRange';
import { NUM_PRODUCTS } from '@config/siteConfig';
import { getHeader, HeaderData } from '@utils/header';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  getAllProducts,
  GetAllProductsResponse,
  getCountOfAllProducts,
  getCountOfProductsOfCollection,
  getProductsOfCollection,
  Sort,
} from 'services/shopify/storefront';
import seo from "../../public/SEO/en.json";

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await getAllProducts(NUM_PRODUCTS);
  const header = await getHeader();
  const numProducts = await getCountOfAllProducts();

  return {
    props: { products, header, numProducts },
    revalidate: 30 * 60,
  };
};

interface AllProductsParams {
  products: GetAllProductsResponse;
  header: HeaderData;
  numProducts: number;
}

function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
}

const AllProducts = ({ products, header, numProducts }: AllProductsParams) => {
  console.log('all project');
  const router = useRouter();

  const mapProducts = (
    products: GetAllProductsResponse
  ): (CardProps & { cursor: string })[] => {
    return products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
      cursor: item.cursor,
    }));
  };

  const [displayed, setDisplayed] = useState(mapProducts(products));
  const [nextPage, setNextPage] = useState(products.pageInfo.hasNextPage);
  const [filter, setFilter] = useState<{
    category: string;
    subcategory: string;
    minPrice: any;
    maxPrice: any;
    sort: Sort | undefined;
  }>({
    category: '',
    subcategory: '',
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined,
  });

  const generateSwitchPage = () => {
    const switchPage: OptionProps[] = [
      {
        icon: '/svg/white-home.svg',
        text: 'Products',
      },
    ];
    if (filter.category !== '') {
      switchPage.push({
        text: filter.category,
        icon: '/svg/rightArrow.svg',
      });
    }
    if (filter.subcategory !== '') {
      switchPage.push({
        text: filter.subcategory,
        icon: '/svg/rightArrow.svg',
      });
    }
    return switchPage;
  };

  const [switchPage, setSwitchPage] = useState(generateSwitchPage());
  const [count, setCount] = useState(numProducts);

  useEffect(() => {
    if (router.isReady && router.query.category !== undefined) {
      const { category, subcategory } = router.query;
      setFilter((prevState) => ({
        ...prevState,
        category: (category as string) || '',
        subcategory: (subcategory as string) || '',
      }));
    }
  }, [/* router.isReady */ router.query.subcategory, router.query.category]);

  const updateProducts = async () => {
    let products: GetAllProductsResponse;
    let numProducts: number;
    if (filter.subcategory !== '') {
      products = await getAllProducts(
        NUM_PRODUCTS,
        undefined,
        {
          type: filter.subcategory,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
      numProducts = await getCountOfAllProducts({
        type: filter.subcategory,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
      });
    } else if (filter.category !== '') {
      products = await getProductsOfCollection(
        filter.category,
        NUM_PRODUCTS,
        undefined,
        { minPrice: filter.minPrice, maxPrice: filter.maxPrice },
        filter.sort
      );
      numProducts = await getCountOfProductsOfCollection(filter.category, {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
      });
    } else {
      products = await getAllProducts(
        NUM_PRODUCTS,
        undefined,
        {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
      numProducts = await getCountOfAllProducts({
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
      });
    }
    setDisplayed(mapProducts(products));
    setNextPage(products.pageInfo.hasNextPage);
    setCount(numProducts);
  };

  useDidUpdateEffect(() => {
    updateProducts();
    setSwitchPage(generateSwitchPage());
  }, [filter]);

  const loadMore = async () => {
    const lastCursor = displayed[displayed.length - 1].cursor;
    let moreProducts: GetAllProductsResponse;
    if (filter.subcategory !== '') {
      moreProducts = await getAllProducts(
        NUM_PRODUCTS,
        lastCursor,
        {
          type: filter.subcategory,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
    } else if (filter.category !== '') {
      moreProducts = await getProductsOfCollection(
        filter.category,
        NUM_PRODUCTS,
        lastCursor,
        { minPrice: filter.minPrice, maxPrice: filter.maxPrice },
        filter.sort
      );
    } else {
      moreProducts = await getAllProducts(
        NUM_PRODUCTS,
        lastCursor,
        {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
    }
    setDisplayed((prev) => [...prev, ...mapProducts(moreProducts)]);
    setNextPage(moreProducts.pageInfo.hasNextPage);
  };

  return (
    <>
      {/* <NextSeo
        title={
          filter.subcategory !== ''
            ? filter.subcategory
            : filter.category !== ''
            ? filter.category
            : 'All products'
        }
        description={
          'BodyKore’s large array of benches comes in various designs that includes fixed and adjustable positions. Any BodyKore bench is a good addition to make as a focal point for your strength training, ensuring you can reap the full benefits of reps and sets.'
        }
      /> */}
      <SeoHeader seo={seo.allProducts} />
      <Header productCat={header.categories} dynamicPages={header.pages} />
      <section className="w-full">
        <FadingAndOptions
          //Switch pages
          options={switchPage}
          title={
            filter.subcategory !== ''
              ? filter.subcategory
              : filter.category !== ''
              ? filter.category
              : 'All products'
          }
          description={
            'BodyKore’s large array of benches comes in various designs that includes fixed and adjustable positions. Any BodyKore bench is a good addition to make as a focal point for your strength training, ensuring you can reap the full benefits of reps and sets.'
          }
          bgImage={'bg-allProducts-image'}
          heightbg={'h-72'}
          heightGradient={'h-56'}
        />

        <div className="flex flex-wrap justify-center lg:justify-between items-center pt-8 max-w-7xl m-auto px-16">
          <div className="lg:w-1/4">
            <div className="max-w-7xl m-auto w-64 mb-5">
              <PriceRange
                value={filter.maxPrice}
                setter={(value) => {
                  setFilter((prevState) => ({
                    ...prevState,
                    maxPrice: value,
                  }));
                }}
              />
            </div>
          </div>

          <div className="lg:w-1/4">
            {filter.category !== '' && filter.category !== 'Packages' ? (
              <ProductsDropdown
                title="Subcategory"
                placeholder="All"
                width="w-64"
                options={header.categories
                  .find((item) => item.title === filter.category)!
                  .subcategories.map((item) => item.name)}
                setter={(value) => {
                  setFilter((prevState) => ({
                    ...prevState,
                    subcategory: value,
                  }));
                }}
                type={filter.subcategory}
              />
            ) : null}
          </div>

          <div className="lg:w-1/2 pl-8">
            <section className="flex max-w-7xl m-auto items-center gap-8 lg:gap-20 xl:gap-36">
              <CheckBox img="/AllProducts/affirm.png" />
              <button
                className="font-sm font-roboto underline text-black-1c2023"
                onClick={() => {
                  setFilter((prevState) => ({
                    ...prevState,
                    category: '',
                    subcategory: '',
                    minPrice: undefined,
                    maxPrice: undefined,
                    sort: undefined,
                  }));
                }}
              >
                Reset all filters
              </button>
            </section>
          </div>
        </div>

        <div className="border-b border-gray-300 pt-4 max-w-7xl m-auto"></div>

        <div className="flex justify-end max-w-7xl m-auto pt-5 pr-10">
          <SortBy
            setter={(value) => {
              setFilter((prevState) => ({
                ...prevState,
                sort: value,
              }));
            }}
            numItems={count}
          />
        </div>

        <div className="px-10 lg:hidden">
          <NavOptions
            title1={'All Products'}
            titles={header.categories.map((item) => ({
              text: item.title,
              id: item.title,
            }))}
            setter={(value) => {
              setFilter((prevState) => ({
                ...prevState,
                category: value.category,
                subcategory: '',
                sort: undefined,
              }));
            }}
            type={filter.category}
          />
        </div>
        <div className="flex flex-row max-w-7xl m-auto px-10">
          <div className="justify-center pt-10 w-36 lg:block hidden lg:visible">
            <VFilterOptions
              title1={'All Products'}
              titles={header.categories.map((item) => ({
                text: item.title,
                id: item.title,
              }))}
              setter={(value) => {
                setFilter((prevState) => ({
                  ...prevState,
                  category: value,
                  subcategory: '',
                  sort: undefined,
                }));
              }}
              type={filter.category}
            />
          </div>
          <div className=" lg:pl-28">
            <SellCards gap="gap-12" cards={displayed} />
            <div className="pt-16 pb-44 px-14">
              {nextPage ? (
                <TransparentBtn
                  text="See more products"
                  width="w-full"
                  fontSize="text-base"
                  onClick={loadMore}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <Footer productCat={header.categories} />
    </>
  );
};

export default AllProducts;
