import { Entity } from '@refract-cms/core';
import { ImageModel } from '@refract-cms/server';

export interface NewsArticleModel extends Entity {
  title: string;
  articleText: string;
  image: ImageModel<'profile' | 'large'>;
}
