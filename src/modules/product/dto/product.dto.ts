export class ProductDto {
  id: number;
  parentCat: string;
  subCategory: string;
  title: string;
  type: string;
  paramsProduct: {
    [key: string]: string;
  }[];
  shortParam: {
    [key: string]: string;
  };
  price: number;
  descriptionOne: string;
  imgLink: string[];
  altImg: string;
  tag: string[];
  rating: number;
  inStock: boolean;
  quantity: number;
  discount: number;
  brand: string;
  imgFolder: string;
  countReviews: number;
  buyAlready: number;
  brendImg: string;
}

export class GetParamProduct {
  take: number;
  id: number;
  skip?: number;
  filter: string;
  priceMin: number;
  priceMax: number;
  brand: string;
}
