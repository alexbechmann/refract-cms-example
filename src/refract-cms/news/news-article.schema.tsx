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
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import { NewsArticleEntity } from './news-article.entity';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment';

export const NewsArticleSchema = defineEntity<NewsArticleEntity>({
  options: {
    alias: 'newsArticle',
    displayName: 'News Article',
    instanceDisplayProps: newsArticle => ({
      primaryText: newsArticle.title,
      secondaryText: newsArticle.articleDate ? moment(newsArticle.articleDate).format('ll') : ''
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
    extraText: {
      displayName: 'Extra text',
      // Example of a basic custom editor component
      editorComponent: props => <input value={props.value} onChange={e => props.setValue(e.target.value)} />,
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
    }
  }
});
