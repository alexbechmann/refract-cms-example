import {
  defineEntity,
  RefractTypes,
  createTextEditor,
  createLocationEditor,
  createSingleDropdownEditor,
  createMultipleDropdownEditor,
  Entity,
  Location
} from '@refract-cms/core';
import CustomDropdownEditor from '../property-editors/CustomDropdownEditor';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';

export interface ProductEntity extends Entity {
  customNumber: number;
  location: Location;
  title: string;
  category: string;
  types: string[];
}

export interface ProductModel extends ProductEntity {
  someVar: string;
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
