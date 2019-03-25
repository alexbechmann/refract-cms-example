import { Entity } from '@refract-cms/core';
import { ImageModel } from '@refract-cms/server';
import { NewsArticleEntity } from './news-article.entity';

export interface NewsArticleModel extends Entity {
  title: string;
  articleText: string;
  imageModel: ImageModel<'profile' | 'large'>;
}
