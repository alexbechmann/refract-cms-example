import { configure, FileSchema } from '@refract-cms/core';
import { NewsArticleSchema } from './news/news-article.schema';
import { NewsArticleTypeSchema } from './news/news-article-type.schema';
import { ProductSchema } from './products/product.schema';
import { SettingsSchema } from './settings/settings.schema';
import { ProductCategorySchema } from './products/product-category.schema';

export default configure({
  schema: [NewsArticleSchema, NewsArticleTypeSchema, ProductSchema, ProductCategorySchema, SettingsSchema, FileSchema]
});
