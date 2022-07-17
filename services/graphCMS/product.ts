import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Subcategory {
  name: string;
  slug?: string;
}

export const getTypesOf = async (slug: string): Promise<Subcategory[]> => {
  // console.log('services', slug);
  const query = gql`
    query TypesOf($slug: String!) {
      category(where: { slug: $slug }) {
        subcaterogies {
          name
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  // console.log('services', slug, query)
  const res = await graphcms.request(query, variables);
  return res.category?.subcategories || [];
};

export interface CategorySlug {
  slug: string;
}

export const getAllCategoriesSlug = async (): Promise<CategorySlug[]> => {
  const query = gql`
    query ProductCategories {
      categories {
        slug
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.categories;
};

export interface CMSCollectionPage {
  category?: {
    cover: {
      url: string;
    };
    discover: {
      url: string;
    }
    features: {
      description: string;
      image: {
        url: string;
      };
    }[];
    subcategories: {
      name: string;
      image?: {
        url: string;
      };
    }[];
  };
  projectCategories: {
    title: string;
    projects: {
      slug: string;
      image: {
        url: string;
      }[];
    }[];
  }[];
}

export const getCMSCollectionPage = async (
  slug: string
): Promise<CMSCollectionPage> => {
  // console.log('serives 1', slug);
  const query = gql`
    query CollectionPage($slug: String!) {
      category(where: { slug: $slug }) {
        cover {
          url
        }
        discover {
          url
        }
        feature {
          description
          image {
            url
          }
        }
        subcaterogies {
          name
          image {
            url
          }
        }
      }
      projectCategories {
        title
        projects(first: 1, orderBy: publishedAt_DESC) {
          slug
          image() {
            url
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  // console.log('query', query);
  const res = await graphcms.request(query, variables);
  return res;
};
