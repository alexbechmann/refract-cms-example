import React from 'react';
import {
  Entity,
  defineEntity,
  RefractTypes,
  ImageRef,
  createTextEditor,
  createDatePickerEditor,
  createImagePickerEditor,
  createSingleEntityPickerEditor,
  createMultipleEntityPickerEditor,
  EntitySchema
} from '@refract-cms/core';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment';
import { ImageModel } from '@refract-cms/server';
import { NewsArticleTypeModel, NewsArticleTypeSchema } from './news-article-type.schema';

export interface NewsArticleEntity extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
  image: ImageRef<'profile' | 'large'>;
  articleTypeId: string;
}

export interface NewsArticleModel extends NewsArticleEntity {
  imageModel: ImageModel<'profile' | 'large'>;
  articleType: NewsArticleTypeModel | null;
}

export const NewsArticleSchema = defineEntity<NewsArticleEntity, NewsArticleModel>({
  options: {
    alias: 'newsArticle',
    displayName: 'News Article',
    instanceDisplayProps: (newsArticle, { context }) => ({
      primaryText: newsArticle.title,
      secondaryText: newsArticle.articleDate ? moment(newsArticle.articleDate).format('ll') : '',
      imageUrl: newsArticle.image
        ? context.fileService.buildImageUrl(newsArticle.image.imageId, newsArticle.image.crops.profile)
        : undefined
    }),
    icon: DescriptionIcon,
    defaultSort: {
      orderByDirection: 'DESC',
      orderByField: 'articleDate'
    }
  },
  properties: {
    title: {
      displayName: 'Headline',
      editorComponent: createTextEditor({
        maxLength: 100
      }),
      defaultValue: 'default headline',
      type: RefractTypes.string
    },
    articleText: {
      displayName: 'Article text',
      editorComponent: createTextEditor({
        maxLength: 100,
        multiline: true
      }),
      defaultValue: '',
      type: RefractTypes.string
    },
    articleDate: {
      displayName: 'Article date',
      editorComponent: createDatePickerEditor(),
      type: RefractTypes.date
    },
    image: {
      displayName: 'Image',
      editorComponent: createImagePickerEditor({
        cropDefinitions: {
          profile: {
            aspectRatio: 4 / 4
          },
          large: {
            aspectRatio: 16 / 9
          }
        }
      }),
      type: RefractTypes.imageShape({
        profile: RefractTypes.cropShape,
        large: RefractTypes.cropShape
      })
    },
    articleTypeId: {
      displayName: 'Article Type',
      editorComponent: createSingleEntityPickerEditor({ schema: NewsArticleTypeSchema }),
      type: RefractTypes.string
    }
  }
});
