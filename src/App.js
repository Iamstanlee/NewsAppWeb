import React, { Component } from 'react';
import moment from 'moment';
import Appbar from './components/Appbar/Appbar';
import Spinner from './components/Spinner/Spinner';
import Error from './components/Error';
import Card from './components/Card/Card';
import Backdrop from './components/Backdrop/Backdrop';
import classes from './App.module.css';
import Icon from './components/Icon';
import { icons } from './assets/assets';

const CATEGORY = [
  'General',
  'Entertainment',
  'Science',
  'Technology',
  'Sport',
  'Health',
  'Business'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      reloading: false,
      error: false,
      errorMessage: null,
      presentCategory: 'General',
      feeds: [],
      showBackdrop: false
    };
  }

  FETCH_NEWS = (category = 'General') => {
    fetch(
      'https://newsapi.org/v2/top-headlines?' +
        'country=ng&' +
        'category=' +
        category +
        '&' +
        'pageSize=100&' +
        'apiKey=727e8a3f9249455e9ca12365a1913b20'
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ feeds: json.articles, loaded: true });
      })
      .catch(err => {
        this.setState({ error: true, errorMessage: err.message });
      });
  };

  componentDidMount = () => {
    this.FETCH_NEWS();
  };

  tryReload = () => {
    this.setState({ reloading: true, error: false });
    this.FETCH_NEWS(this.state.presentCategory);
  };

  handleCategory = category => {
    this.setState({ loaded: false, presentCategory: category });
    if (this.state.showBackdrop) {
      this.setState({ showBackdrop: false });
    }
    this.FETCH_NEWS(category);
  };

  handleBackdrop = () => {
    this.setState({ showBackdrop: !this.state.showBackdrop });
  };

  handleSearch = term => {
    this.setState({ loaded: false });
    fetch(
      'https://newsapi.org/v2/top-headlines?' +
        'country=ng&' +
        'category=' +
        this.state.presentCategory +
        '&' +
        'q=' +
        term +
        '&' +
        'pageSize=100&' +
        'apiKey=727e8a3f9249455e9ca12365a1913b20'
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ feeds: json.articles, loaded: true });
        console.log(json.data);
      })
      .catch(err => {
        this.setState({ error: true, errorMessage: err.message });
      });
  };

  renderCategory = () => {
    return (
      <div className={classes.categoryList}>
        <p>Change Category</p>
        <ul>
          {CATEGORY.map(category => {
            return (
              <li
                style={{
                  color: this.state.presentCategory === category ? '#F03' : '#000'
                }}
                onClick={() => this.handleCategory(category)}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  renderMobileCategory = () => {
    return (
      <div className={classes.mobileCategoryList}>
        <p>Change Category</p>
        <ul>
          {CATEGORY.map(category => {
            return <li onClick={() => this.handleCategory(category)}>{category}</li>;
          })}
        </ul>
      </div>
    );
  };

  renderFeeds = () => {
    let { reloading, loaded, feeds, error, errorMessage } = this.state;
    let feed = <Spinner />;
    if (reloading) {
      feed = <Spinner />;
    }

    if (error) {
      feed = <Error message={errorMessage} tryReload={this.tryReload} />;
    }

    if (loaded) {
      feed = feeds.map(article => {
        let featuredImage =
          typeof article.urlToImage !== 'string'
            ? require('./assets/noimage.png')
            : article.urlToImage;
        return (
          <Card
            key={article.title}
            featuredImage={featuredImage}
            title={article.title
              .split(' ')
              .map(x => x.charAt(0).toUpperCase() + x.slice(1))
              .join(' ')}
            time={moment.parseZone(article.publishedAt).fromNow()}
            url={article.url}
            description={
              typeof article.description !== 'string'
                ? article.description
                : article.description
                    .slice(0, 250)
                    .split(' ')
                    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
                    .join(' ')
            }
          />
        );
      });
    }
    return <div className={classes.feeds}>{feed}</div>;
  };

  renderFooter = () => {
    return (
      <div className={classes.footer}>
        <a href="https://twitter.com/___devS_" target="_blank" rel="noopener noreferrer">
          <Icon source={icons.twitter} style={{ height: '16px', width: '18px' }} />
        </a>
        <span>
          Made with React & Powered by
          <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">
            newsapi.org
          </a>
        </span>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Appbar
          category={this.state.presentCategory}
          handleSearch={term => this.handleSearch(term)}
        />
        {this.renderCategory()}
        {this.renderFeeds()}
        {this.renderFooter()}
        <button className={classes.fab} onClick={this.handleBackdrop}>
          <Icon source={icons.category} />
        </button>
        {this.state.showBackdrop && this.renderMobileCategory()}
        <Backdrop
          show={this.state.showBackdrop}
          onClick={() => this.setState({ showBackdrop: false })}
        />
      </React.Fragment>
    );
  }
}

export default App;
