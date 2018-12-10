import React from 'react';
import { graphql } from 'react-apollo';
import { NewsArticle } from '../../refract-cms/news/news-article.model';
import NEWS_QUERY from './news-query.graphql';
import { CircularProgress } from '@material-ui/core';

interface Data {
  news: NewsArticle[];
}

const News = graphql<{}, Data>(NEWS_QUERY)(props => {
  if (props.data.loading) {
    return <CircularProgress />;
  } else if (props.data.error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <h3>News</h3>
      <ul>
        {props.data.news.map(newsArticle => (
          <li>
            {newsArticle.title} - {newsArticle.articleText} (id: {newsArticle._id})
          </li>
        ))}
      </ul>
    </div>
  );
});

export default News;
