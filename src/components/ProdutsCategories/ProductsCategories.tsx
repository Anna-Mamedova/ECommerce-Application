import React, { useContext, useState } from 'react';
import {
  IAllCategories,
  ICategoryResp,
  IProductCategories,
} from '../../interfaces/productsCategory.interface';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';


function createCategoryTree(
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

function ProductsCategories({ allCategories, setCards, setProductCategoryName }: IProductCategories) {
  const categories = createCategoryTree(allCategories);

  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { token } = useContext(AccessTokenContext);

  const handleClick = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  const [fetchCategory] = useApi(async (id) => {
    const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections/search?filter.query=categories.id:"${id}"`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const res: ICategoryResp[] = data.results;
    setCards(res);
  });

  const getCaregory = (id: string) => {
    fetchCategory(id);
    handleCategoryName(id);
  };

  const handleCategoryName = (id: string) => {
    allCategories.forEach(el => {
      if (el.id === id) {
        setProductCategoryName(el.description["en-US"]);
      }
    });
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }
    >
      {categories.map((el) => (
        <>
          <ListItemButton
            key={el.id}
            onClick={() => {
              handleClick(el.id);
              getCaregory(el.id);
            }}
          >
            <ListItemText primary={el.name['en-US']} />
            {openCategories.includes(el.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {el.children?.map((child) => (
            <Collapse
              key={child.id}
              in={openCategories.includes(el.id)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => getCaregory(child.id)}
                >
                  <ListItemText primary={child.name['en-US']} />
                </ListItemButton>
              </List>
            </Collapse>
          ))}
        </>
      ))}
    </List>
  );
}

export default ProductsCategories;
