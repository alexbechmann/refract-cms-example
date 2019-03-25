import { Entity } from '@refract-cms/core';
import { ImageModel } from '@refract-cms/server';

export interface NewsArticleModel {
  _id: string;
  title: string;
  articleText: string;
  imageModel: ImageModel<'profile' | 'large'>;
}
