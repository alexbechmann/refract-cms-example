import React from 'react';
import { graphql } from 'react-apollo';
import { NewsArticle } from '../../refract-cms/news/news-article.model';
import { CircularProgress } from '@material-ui/core';
import { Product } from '../../refract-cms/products/product.model';
import PRODUCTS_QUERY from './products-query.graphql';

const Products = graphql<{}, { products: Product[] }>(PRODUCTS_QUERY)(props => {
  if (props.data.loading) {
    return <CircularProgress />;
  } else if (props.data.error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <h3>Products</h3>
      <ul>
        {props.data.products.map(product => (
          <li>
            {product.title} - {product.category} (id: {product._id})
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Products;
