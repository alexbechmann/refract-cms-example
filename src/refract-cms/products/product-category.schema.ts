import { defineEntity, RefractTypes, createTextEditor, Entity } from '@refract-cms/core';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

export interface ProductCategoryEntity extends Entity {
  name: string;
}

export interface ProductCategoryModel extends ProductCategoryEntity {}

export const ProductCategorySchema = defineEntity<ProductCategoryEntity, ProductCategoryModel>({
  options: {
    alias: 'productCategory',
    displayName: 'Product category',
    instanceDisplayProps: productCategory => ({
      primaryText: `${productCategory.name}`
    }),
    icon: ScatterPlotIcon
  },
  properties: {
    name: {
      displayName: 'Name',
      editorComponent: createTextEditor({ maxLength: 10 }),
      defaultValue: 'default',
      type: RefractTypes.string
    }
  }
});
