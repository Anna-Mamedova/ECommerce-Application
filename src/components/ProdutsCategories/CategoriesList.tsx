import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React from 'react';
import { createCategoryTree } from '../../utils/productCategoriesUtils';
import { ICategoriesList } from '../../interfaces/productsCategory.interface';

function CategoriesList({
  categoriesData,
  openCategories,
  handleMainCategoryClick,
  handleCategory,
}: ICategoriesList) {
  const categoriesTree = createCategoryTree(categoriesData);
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        mb: 3,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }
    >
      {categoriesTree.map((mainCategory) => (
        <React.Fragment key={mainCategory.id}>
          <ListItemButton
            onClick={() => {
              handleMainCategoryClick(mainCategory.id);
              handleCategory(mainCategory.id);
            }}
          >
            <ListItemText primary={mainCategory.name['en-US']} />
            {openCategories.includes(mainCategory.id) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={openCategories.includes(mainCategory.id)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {mainCategory.children?.map((childCategory) => {
                const childCategoryId = childCategory.id;
                const childCategoryName = childCategory.name['en-US'];
                return (
                  <ListItemButton
                    key={childCategoryId}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      handleCategory(childCategoryId);
                    }}
                  >
                    <ListItemText primary={childCategoryName} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}

export default CategoriesList;
