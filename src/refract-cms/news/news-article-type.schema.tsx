import React from 'react';
import { Entity, defineEntity, RefractTypes, createTextEditor } from '@refract-cms/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export interface NewsArticleTypeEntity extends Entity {
  title: string;
}

export interface NewsArticleTypeModel extends NewsArticleTypeEntity {}

export const NewsArticleTypeSchema = defineEntity<NewsArticleTypeEntity, NewsArticleTypeModel>({
  options: {
    alias: 'newsArticleType',
    displayName: 'News Article Type',
    instanceDisplayProps: newsArticleType => ({
      primaryText: newsArticleType.title
    }),
    icon: LocalOfferIcon,
    defaultSort: {
      orderByDirection: 'ASC',
      orderByField: 'title'
    }
  },
  properties: {
    title: {
      displayName: 'Title',
      editorComponent: createTextEditor({
        maxLength: 100
      }),
      defaultValue: '',
      type: RefractTypes.string
    }
  }
});
