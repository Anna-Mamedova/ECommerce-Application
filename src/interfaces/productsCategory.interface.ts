import { Dispatch, SetStateAction } from "react";
import {  IProductsResp } from "./product.interface"
import { BreadcrumbType } from "../types/breadcrumb.type";

export interface IBreadcrumbProps {
  breadcrumb: BreadcrumbType;
  handleCategory: (categoryId: string) => void;
}

export interface ICategoriesList {
  categoriesData: IProductsResp[];
  openCategories: string[];
  handleMainCategoryClick: (categoryId: string) => void
  handleCategory: (categoryId: string) => void;
}

export interface IColorsArray {
  term: string
  count: number
}

export interface IAllCategories {
  id: string;
  parent?: {
    id: string;
  };
  name: {
    'en-US': string;
  };
  children?: IAllCategories[];
}

export interface IAllCategoriesPlusDeskr extends IAllCategories {
  description: {
    'en-US': string;
  };
}

export interface IProductCategories {
  fetchCards: (id?: string) => void;
  categoriesData: Array<IProductsResp>;
  setCards: Dispatch<SetStateAction<IProductsResp[]>>
  setProductCategoryName: Dispatch<SetStateAction<string>>
  setId: Dispatch<SetStateAction<string>>
}

