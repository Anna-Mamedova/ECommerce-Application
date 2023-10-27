import { Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { IBreadcrumbProps } from '../../interfaces/productsCategory.interface';

function Breadcrumb({ breadcrumb, handleCategory }: IBreadcrumbProps) {
  return (
    <Breadcrumbs sx={{ mb: 3, ml: 2 }} aria-label="breadcrumb" separator="›">
      {breadcrumb.map((bread, index) => {
        const categoryName = bread[0];
        const categoryId = bread[1];
        const lastBreadIndex = breadcrumb.length - 1;
        return (
          <Link
            underline="hover"
            key={index}
            color={index === lastBreadIndex ? 'text.primary' : 'text.secondary'}
            onClick={() => handleCategory(categoryId)}
          >
            {categoryName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
