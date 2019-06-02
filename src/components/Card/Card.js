import React from 'react';
import classes from './Card.module.css';
import Icon from '../Icon';
import { icons } from '../../assets/assets';

const card = ({ title, time, featuredImage, description, url }) => {
  return (
    <div className={classes.card}>
      <div className={classes.titleblock}>
        <strong>{title}</strong>
        <span>{time}</span>
      </div>
      <img src={featuredImage} className={classes.featuredImage} alt={'Loading FeaturedImage...'} />
      <p>{description}</p>
      <div className={classes.actions}>
        <a href={'https://www.facebook.com/sharer.php?u=' + url}>
          <Icon source={icons.share} style={{ marginLeft: '10px' }} />
        </a>
        <a href={url}>
          <strong>Read More</strong>
        </a>
      </div>
    </div>
  );
};

export default card;
