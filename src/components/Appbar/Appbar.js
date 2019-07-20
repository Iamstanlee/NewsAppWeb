import React from 'react';
import Icon from '../Icon';
import classes from './Appbar.module.css';
import { icons } from '../../assets/assets';

const appbar = props => {
  const [value, setValue] = React.useState('');

  const handleSearch = value => {
    props.handleSearch(value);
    setValue('');
  };
  return (
    <div className={classes.appbar}>
      <div className={classes.appbarHeader}>
        <span>NEWS</span>
        <span>{props.category}</span>
      </div>
      <div className={classes.searchbox}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={'Search ' + props.category + ' category...'}
        />
        <Icon source={icons.search} onClick={() => handleSearch(value)} />
      </div>
    </div>
  );
};

export default appbar;
