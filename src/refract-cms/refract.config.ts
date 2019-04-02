import { configure, FileSchema } from '@refract-cms/core';
import { NewsArticleSchema } from './news/news-article.schema';
import { NewsArticleTypeSchema } from './news/news-article-type.schema';

export default configure({
  schema: [NewsArticleSchema, NewsArticleTypeSchema, FileSchema]
});
