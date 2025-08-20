export const defaultPaginatorOptions = {
  page: 1,
  first: 0,
  rows: 10,
  pageSize: 5,
};

export interface IPaginatorOptions {
  page: number;
  first: number;
  rows: number;
  pageSize: number;
}

export class PaginatorErrorHandler {
  count = 0;
  index!: number;
  items = [];
  pages = 0;
  size!: number;
  constructor(options: IPaginatorOptions) {
    this.index = options.page;
    this.size = options.pageSize;
  }
}
