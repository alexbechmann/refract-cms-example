import React from 'react';
import { PropertyEditorProps } from '@refract-cms/core';
import { Typography, withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    highlightedText: {
      color: theme.palette.secondary.main,
      fontWeight: 500
    }
  });

interface Props extends PropertyEditorProps<number>, WithStyles<typeof styles> {}

const CustomDropdownEditor = ({ value, setValue, classes }: Props) => {
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

export default withStyles(styles)(CustomDropdownEditor) as React.ComponentType<PropertyEditorProps<number>>;
