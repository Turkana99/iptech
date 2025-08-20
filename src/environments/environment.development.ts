import { IPaginatorOptions } from '../app/core/consts';

const baseUrl = 'https://api.iptech.az/api/v1';

export const environment = {
  Languages: {
    getAll: '',
  },
  Products: {
    getList: ({ page, pageSize }: IPaginatorOptions) =>
      `${baseUrl}/Products/list-by-client?PageIndex=${page}&PageSize=${pageSize}`,
    getBySlug: (slug: string) =>
      `${baseUrl}/Products/product-by-slug/${slug}`,
  },
  ProductPages: {
    get: () => `${baseUrl}/ProductPages/product-page-by-client`,
  },
   AboutPages: {
    get: `${baseUrl}/AboutPages/about-page-by-client`,
  },
};
