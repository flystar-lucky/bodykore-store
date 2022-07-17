import React, { useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import dynamic from 'next/dynamic';
import SearchForm from '@components/ui/bodykore/Forms/SearchForm';
import MapCards, { CardsProps } from '@components/ui/bodykore/map/MapCards';
import { GetStaticProps } from 'next';
import { Coordinates, getAllStores, Store } from 'services/graphCMS';
import { getDistance, orderStoreByDistance } from '@utils/distance';
import { getCoordinatesAPI } from 'services/api';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { NextSeo } from 'next-seo'
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getStaticProps: GetStaticProps = async (context) => {
  const stores = await getAllStores();
  const header = await getHeader();

  return {
    props: {
      stores,
      header
    },
    revalidate: 30 * 60,
  };
};

interface StoreLocatorParams {
  stores: Store[];
  header: HeaderData;
}

const MapWithNoSSR = dynamic(
  () => import('@components/ui/bodykore/map/StoresMap'),
  {
    ssr: false,
  }
);

const StoreLocator = ({ stores, header }: StoreLocatorParams) => {
  const mapStores = (stores: Store[]): CardsProps[] => {
    return stores.map((item) => ({
      title: item.title,
      direction: item.address,
      latitude: item.coordinates.latitude,
      longitude: item.coordinates.longitude,
    }));
  };
  const [ordered, setOrdered] = useState<CardsProps[]>(mapStores(stores));
  const [coord, setCoord] = useState<Coordinates | undefined>(undefined);

  const handleSearch = async (zipCode: string) => {
    const input = await getCoordinatesAPI(zipCode);
    if (input === undefined) {
      // The zipcode is incorect or location was not found
      return;
    }
    const reorder = stores.map((item) => ({
      title: item.title,
      direction: item.address,
      distance: getDistance(
        item.coordinates.latitude,
        item.coordinates.longitude,
        input.latitude,
        input.longitude
      ),
      latitude: item.coordinates.latitude,
      longitude: item.coordinates.longitude,
    }));
    reorder.sort((a, b) => a.distance - b.distance);
    setOrdered(reorder);
    setCoord(input);
  };

  const goToLocation = (latitude: number, longitude: number) => {
    setCoord({ longitude, latitude });
  };

  return (
    <>
      <SeoHeader seo={seo.storeLocator} />

      <Header productCat={header.categories} dynamicPages={header.pages} />
      <main className="w-full">
        <FadingBanner
          height={'h-72'}
          title={'STORE LOCATOR'}
          bgImage={'bg-manuals-image'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non velit sapien. Mauris et ante in quam pretium malesuada ac a massa. Vestibulum lacinia augue et dolor ullamcorper efficitur.'
          }
        />

        <div className="flex flex-row flex-wrap justify-center xl:justify-start max-w-7xl m-auto py-16 px-6 gap-8 lg:gap-0">
          <div className="lg:w-1/2 px-8">
            <SearchForm search={handleSearch} />
            <MapCards cards={ordered} setter={goToLocation} />
          </div>
          <div id="map" className="lg:w-1/2 z-0" style={{ height: '660px', width:'610px' }}>
            <MapWithNoSSR stores={stores} coord={coord} />
          </div>
        </div>
      </main>
      <Footer productCat={header.categories} />
    </>
  );
};

export default StoreLocator;
