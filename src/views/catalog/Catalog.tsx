import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AccessTokenContext } from '../../context';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useApi } from '../../hooks/useApi';
import ProductsCategories from '../../components/ProdutsCategories/ProductsCategories';
import ProductsList from '../../components/ProductsList/ProductsList';
import { IProductsResp } from '../../interfaces/product.interface';

function Catalog() {
  const LOAD_CARDS_HEIGHT: number = 200;
  const [cards, setCards] = useState<IProductsResp[]>([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [productCategoryName, setProductCategoryName] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  const { token } = useContext(AccessTokenContext);

  const fetchCardsCallback = useCallback(
    async (id = '') => {
      setLoading(true);
      try {
        const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${
          process.env.REACT_APP_CTP_PROJECT_KEY
        }/product-projections/search?${
          id
            ? `&filter.query=categories.id:"${id}"&limit=${itemsPerPage}&offset=${
                (page - 1) * itemsPerPage
              }`
            : `&limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`
        }`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const res = data.results;

        page === 1 ? setCards([...res]) : setCards([...cards, ...res]);
        if (!id) setProductCategoryName('All products');
        if (res.length < itemsPerPage) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [token, cards, page, setCards, setProductCategoryName]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        hasMore &&
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - LOAD_CARDS_HEIGHT
      ) {
        setPage(page + 1);
        categoryId ? fetchCardsCallback(categoryId) : fetchCardsCallback();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, page, setPage]);

  const [fetchCards, isLoading, cardsError] = useApi(fetchCardsCallback);

  const [fetchCategories, isLoadingCategories, categoriesError] = useApi(
    async () => {
      const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/categories`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setCategories(data.results);
    }
  );

  useEffect(() => {
    if (token) {
      fetchCards();
      fetchCategories();
    }
  }, [token]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    if (cards.length > 10) {
      setCards([]);
    }
    if (categoryId) {
      fetchCardsCallback(categoryId);
    }
  }, [isLoading]);

  return (
    <Container maxWidth="lg" sx={{ mb: 10 }}>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontSize: '48px', mt: 4, mb: 4 }}
      >
        {productCategoryName}
      </Typography>
      {(cardsError || categoriesError) && (
        <Typography align="center" variant="h4">
          Oops, something went wrong. Please try again later.
        </Typography>
      )}
      {!isLoadingCategories && (
        <ProductsCategories
          fetchCards={fetchCards}
          categoriesData={categories}
          setCards={setCards}
          setProductCategoryName={setProductCategoryName}
          setId={setCategoryId}
        />
      )}
      {isLoading ? (
        <CircularProgress
          style={{ width: '70px', height: '70px' }}
          color="inherit"
          sx={{ margin: '0 auto', display: 'block' }}
        />
      ) : (
        <>
          <ProductsList productCards={cards} />
          {loading && (
            <CircularProgress
              style={{ width: '70px', height: '70px' }}
              color="inherit"
              sx={{ margin: '0 auto', display: 'block' }}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Catalog;
