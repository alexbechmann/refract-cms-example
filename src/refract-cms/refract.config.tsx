import { configure, FileSchema } from '@refract-cms/core';
import { NewsArticleSchema } from './news/news-article.schema';

export default configure({
  schema: [NewsArticleSchema, FileSchema]
});
