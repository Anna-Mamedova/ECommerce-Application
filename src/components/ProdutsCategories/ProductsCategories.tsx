import React, { useContext, useEffect, useState } from 'react';
import {
  IColorsArray,
  IProductCategories,
} from '../../interfaces/productsCategory.interface';
import { Container } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';
import {
  getAMainCategoriesArray,
  transformCategoriesIntoObj,
} from '../../utils/productCategoriesUtils';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { BreadcrumbType } from '../../types/breadcrumb.type';
import { currencyToCents, formatCentsToCurrency } from '../../utils/product';
import ProductsFiltersMenu from '../ProductFilters/ProductsFiltersMenu';
import CategoriesList from './CategoriesList';

function ProductsCategories({
  fetchCards,
  categoriesData,
  setCards,
  setProductCategoryName,
  setId,
}: IProductCategories) {
  const [breadcrumb, setBreadcramb] = useState<BreadcrumbType>([['All', '']]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [sortFilter, setSortFilter] = useState('');
  const [textSeachFilter, setTextSeachFilter] = useState<undefined | string>(
    undefined
  );

  const categories = transformCategoriesIntoObj(categoriesData);
  const mainCategories = getAMainCategoriesArray(categoriesData);
  const [categoryId, setCategoryId] = useState('');
  const { token } = useContext(AccessTokenContext);
  const [filterColorValue, setFilterColorValue] = useState<string>('');
  const [colorsAttributesArray, setColorsAttributesArray] = useState<
    IColorsArray[]
  >([]);

  const [highestPriceProduct, setHighestPriceProduct] = useState<number | null>(
    null
  );
  const [lowestPriceProduct, setLowestPriceProduct] = useState<number | null>(
    null
  );
  const [priceRangeSliderValues, setPriceRangeSliderValues] = useState<
    number[]
  >([0, 1]);

  const getQueryString = () => {
    const queryParts = [];

    categoryId && queryParts.push(`filter.query=categories.id:"${categoryId}"`);
    sortFilter !== 'default' && queryParts.push(sortFilter);
    textSeachFilter && queryParts.push(`text.en-US=${textSeachFilter}`);
    textSeachFilter && queryParts.push('fuzzy=true');
    filterColorValue &&
      queryParts.push(
        `filter.query=variants.attributes.color:"${filterColorValue}"`
      );
    const priceRangeQuery = `variants.price.centAmount:range(${currencyToCents(
      priceRangeSliderValues[0]
    )} to ${currencyToCents(priceRangeSliderValues[1])})`;
    queryParts.push(`filter.query=${priceRangeQuery}`);

    return queryParts.join('&');
  };

  const [fetchCardsBySort, , fetchCardsBySortError] = useApi(async () => {
    const query = getQueryString();
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${query}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res = data.results;
    setCards(res);
  });

  const [fetchAttribites, , attributesError] = useApi(async (id) => {
    const categoryQuery = id ? `filter.query=categories.id:"${id}"&` : '';
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}&facet=variants.attributes.color`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res = data.facets['variants.attributes.color'].terms;
    setColorsAttributesArray(res);
  });

  const [fetchMinMaxCentAmount, , minMaxCentAmountError] = useApi(
    async (id) => {
      const categoryQuery = id ? `filter.query=categories.id:"${id}"&` : '';
      const limit = `&limit=1&`;
      const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?${categoryQuery}`;

      const responseHigh = await fetch(`${apiUrl}${limit}&sort=price desc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseLow = await fetch(`${apiUrl}${limit}&sort=price asc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const higthPriceData = await responseHigh.json();
      const lowPriceData = await responseLow.json();
      const highPrice = Number(
        formatCentsToCurrency(
          higthPriceData.results[0].masterVariant.prices[0].value.centAmount
        )
      );
      const lowPrice = Number(
        formatCentsToCurrency(
          Number(
            lowPriceData.results[0].masterVariant.prices[0].value.centAmount
          )
        )
      );
      setHighestPriceProduct(highPrice);
      setLowestPriceProduct(lowPrice);
      setPriceRangeSliderValues([lowPrice, highPrice]);
    }
  );

  const handleMainCategoryClick = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories((prev) => prev.filter((item) => item !== categoryId));
      setCards([]);
      setId(categoryId);
    } else {
      setCards([]);
      setId('');
      openCategories.length = 0;
      setOpenCategories((prev) => [...prev, categoryId]);
    }
  };

  const resetFilters = (id = '') => {
    setSortFilter('default');
    setTextSeachFilter('');
    setFilterColorValue('');
    if (lowestPriceProduct && highestPriceProduct) {
      setPriceRangeSliderValues([lowestPriceProduct, highestPriceProduct]);
    }

    !attributesError && fetchAttribites(id);
    !minMaxCentAmountError && fetchMinMaxCentAmount(id);
  };

  const handleCategory = (categoryId: string) => {
    if (!categoryId) {
      setBreadcramb((prev) => [prev[0]]);
      openCategories.length = 0;
      setCategoryId('');
      setCards([]);
      setId('');
      fetchCards();
      resetFilters();
      return;
    }

    setCategoryId(categoryId);
    setId(categoryId);
    setCards([]);
    fetchCards(categoryId);
    updateBreadcrumbArray(categoryId);
    setProductCategoryName(categories[categoryId][1]);
  };

  const updateBreadcrumbArray = (id: string) => {
    const currentCategoryName = categories[id][0];
    const currentCategoryId = categories[id][2];
    const maxBreadcrumbLength = mainCategories.length + 1;
    if (breadcrumb.length > 1 && mainCategories.includes(currentCategoryName)) {
      setBreadcramb((prev) => [
        ...prev.slice(0, 1),
        [currentCategoryName, currentCategoryId],
      ]);
    } else if (breadcrumb.length >= maxBreadcrumbLength) {
      setBreadcramb((prev) => [
        ...prev.slice(0, breadcrumb.length - 1),
        [currentCategoryName, currentCategoryId],
      ]);
    } else {
      setBreadcramb((prev) => [
        ...prev,
        [currentCategoryName, currentCategoryId],
      ]);
    }
  };

  useEffect(() => {
    !minMaxCentAmountError && fetchMinMaxCentAmount();
    !attributesError && fetchAttribites();
  }, []);

  useEffect(() => {
    if (textSeachFilter === undefined) return;
    !fetchCardsBySortError && fetchCardsBySort();
  }, [textSeachFilter]);

  const applyFilters = () => {
    !fetchCardsBySortError && fetchCardsBySort();
  };

  const handleResetFilters = () => {
    if (categoryId) {
      fetchCards(categoryId);
      resetFilters(categoryId);
    } else {
      resetFilters();
      fetchCards();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 3 }}>
      <CategoriesList
        categoriesData={categoriesData}
        openCategories={openCategories}
        handleMainCategoryClick={handleMainCategoryClick}
        handleCategory={handleCategory}
      />
      <Breadcrumb breadcrumb={breadcrumb} handleCategory={handleCategory} />
      <ProductsFiltersMenu
        textSeachFilter={textSeachFilter}
        setTextSeachFilter={setTextSeachFilter}
        sortFilter={sortFilter}
        setSortFilter={setSortFilter}
        filterColorValue={filterColorValue}
        setFilterColorValue={setFilterColorValue}
        colorsAttributesArray={colorsAttributesArray}
        minPriceValue={lowestPriceProduct}
        maxPriceValue={highestPriceProduct}
        priceRangeSliderValues={priceRangeSliderValues}
        setPriceRangeSliderValues={setPriceRangeSliderValues}
        applyFilters={applyFilters}
        handleResetFilters={handleResetFilters}
      />
    </Container>
  );
}

export default ProductsCategories;
