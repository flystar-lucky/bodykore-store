import { DynamicPages, getSearchItems, getTypesOf, Subcategory } from 'services/graphCMS';
import { getCollectionsHeader } from 'services/shopify/storefront';

export interface CategoryData {
  title: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface HeaderData {
  categories: CategoryData[];
  pages: DynamicPages;
}

export const getHeader = async (): Promise<HeaderData> => {
  const res = await getCollectionsHeader();
  const headerCat = res.collections.edges;
  // We put the packages collection first
  headerCat.sort((a, b) =>
    a.node.handle === 'packages' ? -1 : b.node.handle === 'packages' ? 1 : 0
  );
  const categories = await Promise.all(
    headerCat.map(async (item) => {
      let subcategories;
      if (item.node.handle == 'packages') {
        subcategories = res.collection.products.edges.map((item) => ({
          name: item.node.title,
          slug: item.node.handle,
        }));
      } else {
        subcategories = await getTypesOf(item.node.handle);
      }
      return {
        title: item.node.title,
        slug: item.node.handle,
        image: item.node.image.url,
        subcategories: subcategories,
      };
    })
  );
  const pages = await getSearchItems();
  return {categories, pages};
};
