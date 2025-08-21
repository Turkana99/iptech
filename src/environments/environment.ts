import { IPaginatorOptions } from '../app/core/consts';

const baseUrl = 'https://api.iptech.az/api/v1';

export const environment = {
  Languages: {
    getAll: '',
  },
  Products: {
    getList: ({ page, pageSize }: IPaginatorOptions) =>
      `${baseUrl}/Products/list-by-client?PageIndex=${page}&PageSize=${pageSize}`,
    getBySlug: (slug: string) => `${baseUrl}/Products/product-by-slug/${slug}`,
  },
  ProductPages: {
    get: () => `${baseUrl}/ProductPages/product-page-by-client`,
  },
  AboutPages: {
    get: `${baseUrl}/AboutPages/about-page-by-client`,
    getQualitiesForAboutPage: `${baseUrl}/Qualities/list-by-client`,
  },
  Services: {
    getList: ({ page, pageSize }: IPaginatorOptions) =>
      `${baseUrl}/Services/list-by-client?PageIndex=${page}&PageSize=${pageSize}`,
    getBySlug: (slug: string) => `${baseUrl}/Services/service-by-slug/${slug}`,
  },
  ServicePages: {
    get: () => `${baseUrl}/ProductPages/product-page-by-client`,
  },
};
