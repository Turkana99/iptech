import { IPaginatorOptions } from '../app/core/consts';

const baseUrl = 'https://api.iptech.az/api/v1';

export const environment = {
  AboutPages: {
    get: `${baseUrl}/AboutPages/about-page-by-client`,
  },
  Appeals: {
    create: `${baseUrl}/api/v1/Appeals/create-appeal`,
  },
  Languages: {
    getAll: `${baseUrl}/Languages/list-language`,
  },
  Contacts: {
    getByClient: `${baseUrl}/api/v1/Contacts/contact-by-client`,
    getByClientHome: `${baseUrl}/api/v1/Contacts/contact-by-client-home-page`,
  },
  Customers: {
    getByClient: `${baseUrl}/api/v1/Customers/customers-by-client`,
  },
  HomePages: {
    getByClient: `${baseUrl}/api/v1/HomePages/home-page-by-client`,
  },
  Partners: {
    getByClient: `${baseUrl}/api/v1/Partners/list-by-client`,
  },
  ProductPages: {
    get: `${baseUrl}/ProductPages/product-page-by-client`,
  },
  Products: {
    getList: ({ page, pageSize }: IPaginatorOptions) =>
      `${baseUrl}/Products/list-by-client?PageIndex=${page}&PageSize=${pageSize}`,
    listByHomePage: `${baseUrl}/api/v1/Products/list-by-home-page`,
    getBySlug: (slug: string) => `${baseUrl}/Products/product-by-slug/${slug}`,
  },
  Qualities: {
    getByClient: `${baseUrl}/api/v1/Qualities/list-by-client`,
  },
  ServicePages: {
    get: `${baseUrl}/ServicePages/service-page-by-client`,
  },
  Services: {
    getList: ({ page, pageSize }: IPaginatorOptions) =>
      `${baseUrl}/Services/list-by-client?PageIndex=${page}&PageSize=${pageSize}`,
    getBySlug: (slug: string) => `${baseUrl}/Services/service-by-slug/${slug}`,
    getByCount: `${baseUrl}/api/v1/Services/list-by-count-client`,
  },
  Statistics: {
    getByClient: `${baseUrl}/api/v1/Statistics/list-by-client`,
  },
  Tags: {
    get: `${baseUrl}/api/v1/Tags/list`,
  },
};
