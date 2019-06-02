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
      <img src={featuredImage} className={classes.featuredImage} alt="FeaturedImage" />
      <p>{description}</p>
      <div className={classes.actions}>
        <Icon source={icons.share} style={{ marginLeft: '10px' }} />
        <a href={url}>
          <strong>Read More</strong>
        </a>
      </div>
    </div>
  );
};

export default card;
