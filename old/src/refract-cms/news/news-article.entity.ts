import { Entity, ImageRef } from '@refract-cms/core';

export interface NewsArticleEntity extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
  extraText: string;
  image: ImageRef<'profile' | 'large'>;
}
