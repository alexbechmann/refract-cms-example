import {
  defineEntity,
  RefractTypes,
  createTextEditor,
  createLocationEditor,
  createSingleDropdownEditor,
  createMultipleDropdownEditor,
  Entity,
  Location,
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import CustomDropdownEditor from '../property-editors/CustomDropdownEditor';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import { ProductCategoryModel, ProductCategorySchema } from './product-category.schema';

export interface ProductEntity extends Entity {
  customNumber: number;
  location: Location;
  title: string;
  category: string;
  types: string[];
  productCategoryIds: string[];
}

export interface ProductModel extends ProductEntity {
  productCategories: ProductCategoryModel[];
}

export const ProductSchema = defineEntity<ProductEntity, ProductModel>({
  options: {
    alias: 'product',
    displayName: 'Product',
    instanceDisplayProps: product => ({
      primaryText: `${product.title}`,
      secondaryText: `${product.category} (${product.types ? product.types.join(', ') : ''})`
    }),
    icon: ScatterPlotIcon
  },
  properties: {
    productCategoryIds: {
      displayName: 'Product categories',
      editorComponent: createMultipleEntityPickerEditor({
        schema: ProductCategorySchema
      }),
      type: RefractTypes.arrayOf(RefractTypes.string)
    },
    title: {
      displayName: 'Title',
      editorComponent: createTextEditor({
        maxLength: 30
      }),
      defaultValue: '',
      type: RefractTypes.string
    },
    customNumber: {
      displayName: 'Custom number',
      defaultValue: 3,
      editorComponent: CustomDropdownEditor,
      type: RefractTypes.number
    },
    location: {
      displayName: 'Location',
      editorComponent: createLocationEditor(),
      defaultValue: {
        longitude: 15,
        latitude: 23
      },
      type: RefractTypes.shape({
        latitude: RefractTypes.number,
        longitude: RefractTypes.number
      })
    },
    category: {
      displayName: 'Category',
      editorComponent: createSingleDropdownEditor({
        selectOptions: ['Electronics', 'Food']
      }),
      defaultValue: 'Electronics',
      type: RefractTypes.string
    },
    types: {
      displayName: 'Types',
      editorComponent: createMultipleDropdownEditor({
        selectOptions: ['Fun', 'Work', 'Travel']
      }),
      type: RefractTypes.arrayOf(RefractTypes.string)
    }
  }
});
