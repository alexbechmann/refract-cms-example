import React from 'react';
import { PropertyEditorProps } from '@refract-cms/core';
import { Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  highlightedText: {
    color: theme.palette.secondary.main,
    fontWeight: 500
  }
}));

export default ({ value, setValue }: PropertyEditorProps<number>) => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.highlightedText} gutterBottom>
        NB: This is an example of a custom component. See './src/refract-cms/property-editors/CustomDropdownEditor.tsx'
      </Typography>
      <select value={value} onChange={e => setValue(parseInt(e.target.value, 10))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
  );
};
