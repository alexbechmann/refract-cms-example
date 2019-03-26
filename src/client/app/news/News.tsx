import React from 'react';
import { compose } from 'recompose';
import { graphql, DataProps } from 'react-apollo';
import gql from 'graphql-tag';
import { NewsArticleModel } from '../../../refract-cms';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Typography,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface NewsProps {}

interface Props extends NewsProps, DataProps<{ newsArticles: NewsArticleModel[] }> {}

const News: React.ComponentType<Props> = ({ data }) => {
  if (data.loading) {
    return <LinearProgress />;
  } else if (data.error) {
    console.log(data.error);
    return <Typography>Something went wrong</Typography>;
  }
  return (
    <List>
      {data.newsArticles.map(article => {
        return (
          <ListItem>
            {article.imageModel && article.imageModel.crops ? (
              <ListItemAvatar>
                <Avatar src={article.imageModel.crops.profile} />
              </ListItemAvatar>
            ) : null}
            <ListItemText primary={article.title} secondary={article.articleText} />
          </ListItem>
        );
      })}
      <br />
      <Button
        color="secondary"
        variant="outlined"
        component={(props: any) => <Link {...props} to="/admin/content/newsArticle" />}
      >
        Click to add some content
      </Button>
    </List>
  );
};

const QUERY = gql`
  {
    newsArticles: newsArticleGetAll {
      _id
      title
      imageModel {
        large
        profile
      }
    }
  }
`;

export default compose(graphql(QUERY))(News) as React.ComponentType<NewsProps>;
