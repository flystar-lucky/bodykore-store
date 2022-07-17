import React from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import { GetStaticProps } from 'next';
import {
  getProjectCategories,
  getProjectsOfCategory,
  ProjectCategory,
  ProjectInfo,
} from 'services/graphCMS';
import { NUM_PROJECTS } from '@config/siteConfig';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import Header from '@components/Header';
import Footer from '@components/Footer';
import routes from '@config/routes';
import { NextSeo } from 'next-seo'
import seo from "../../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await getProjectCategories();
  const projects = [];
  for (let i = 0; i < categories.length; i++) {
    projects.push(
      await getProjectsOfCategory(categories[i].slug, NUM_PROJECTS)
    );
  }
  const header = await getHeader();

  return {
    props: {
      projects,
      categories,
      header
    },
    revalidate: 30 * 60,
  };
};

interface PortfolioParams {
  projects: ProjectInfo[][];
  categories: ProjectCategory[];
  header: HeaderData;
}

const Portfolio = ({ projects, categories, header }: PortfolioParams) => {
  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.title,
      id: item.slug,
    }));
  };

  const mapProjects = () => {
    return categories.map((item, index) => {
      const space = item.title.indexOf(' ');
      return (
        <div className='px-8' key={index}>
          <SliderProgress
            title1={item.title.substring(0, space)}
            title2={item.title.substring(space + 1)}
            color1={'text-red-bc2026'}
            color2={'text-black-373933'}
            id={item.slug}
            bgImage={projects[index].map((item) => ({
              title: item.title,
              url: item.image[0]?.url,
              link: `${routes.portfolio.path}/${item.slug}`
            }))}
            width='w-1/2'
            link={`${routes.portfolio.path}/${item.slug}`}    
          />
        </div>
      );
    });
  };

  return (
    <>
      <SeoHeader seo={seo.portfolio} />

      <Header productCat={header.categories} dynamicPages={header.pages} />
      <main className="w-full">
        <FadingBanner
          title={'PORTFOLIO'}
          bgImage={'bg-portfolio-image'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non velit sapien. Quisque vel mauris odio. Mauris et ante in quam pretium malesuada ac a massa.'
          }
          height={'h-60'}
        />

        <NavOptions title1={'ALL'} titles={mapCategories()} />

        {mapProjects()}
      </main>
      <Footer productCat={header.categories} />
    </>
  );
};

export default Portfolio;
