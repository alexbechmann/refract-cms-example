import React from 'react';
import {
  Entity,
  defineEntity,
  createTextEditor,
  RefractTypes,
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { NewsArticleSchema, NewsArticleModel } from '../news/news-article.schema';
import { Switch } from '@material-ui/core';

export interface SettingsEntity extends Entity {
  setting1: string;
  enableCoolFeature: boolean;
  highlightedArticleIds: string[];
}

export interface SettingsModel extends SettingsEntity {
  highlightedArticles: NewsArticleModel[];
}

export const SettingsSchema = defineEntity<SettingsEntity, SettingsModel>({
  options: {
    alias: 'settings',
    displayName: 'Settings',
    maxOne: true,
    icon: SettingsIcon
  },
  properties: {
    setting1: {
      displayName: 'Setting1',
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      defaultValue: 'Something',
      type: RefractTypes.string
    },
    enableCoolFeature: {
      displayName: 'Enable cool feature',
      defaultValue: false,
      type: RefractTypes.bool,
      // Example of a custom component at its most basic level, importing Switch from material-ui
      editorComponent: ({ value, setValue }) => <Switch checked={value} onChange={(e, value) => setValue(value)} />
    },
    highlightedArticleIds: {
      displayName: 'Highlighted articles',
      type: RefractTypes.arrayOf(RefractTypes.string),
      editorComponent: createMultipleEntityPickerEditor({
        schema: NewsArticleSchema
      })
    }
  }
});
