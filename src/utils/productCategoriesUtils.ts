import { IAllCategories, IAllCategoriesPlusDeskr } from "../interfaces/productsCategory.interface";

export function createCategoryTree(
  categories: IAllCategories[],
  parentId: string | null = null
): IAllCategories[] {
  return categories
    .filter(
      (category) =>
        (category.parent && category.parent.id === parentId) ||
        (!category.parent && !parentId)
    )
    .map((category) => ({
      id: category.id,
      name: { 'en-US': category.name['en-US'] },
      children: createCategoryTree(categories, category.id),
    }));
}

export function transformCategoriesIntoObj(categories: IAllCategoriesPlusDeskr[]) {
  return categories.reduce<{ [key: string]: [string, string, string] }>((object, el) => {
    object[el.id] = [el.name['en-US'], el.description["en-US"], el.id];
    return object;
  }, {});
}

export function getAMainCategoriesArray(categories: IAllCategories[]) {
  return categories.reduce((arr: string[], el) => {
    if (!el.parent) {
      arr.push(el.name['en-US']);
    }
    return arr;
  }, []);
}