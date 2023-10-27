import { IProductsResp } from "../../interfaces/product.interface";

export function getProductCartItemData(currentElData: IProductsResp) {
  return {
    id: currentElData.id,
    currencyCode: currentElData.masterVariant.prices[0].value.currencyCode,
    itemDiscounted: currentElData.masterVariant.prices[0].discounted,
    itemPriceInCents: currentElData.masterVariant.prices[0].value.centAmount,
    itemName: currentElData.name['en-US'],
    itemDeskr: currentElData.description['en-US'],
    imageUrl: currentElData.masterVariant.images[0].url,
  };
}