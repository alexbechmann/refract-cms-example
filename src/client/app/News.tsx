import React from 'react';
import { compose } from 'recompose';
import { graphql, DataProps } from 'react-apollo';
import gql from 'graphql-tag';
import {
  LinearProgress,
  Typography,
  Button,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { NewsArticleModel } from '../../refract-cms/news/news-article.schema';

interface NewsProps {}

const styles = (theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%'
    },
    card: {}
  });

interface Props extends NewsProps, DataProps<{ newsArticles: NewsArticleModel[] }>, WithStyles<typeof styles> {}

const News: React.ComponentType<Props> = ({ data, classes }) => {
  if (data.loading) {
    return <LinearProgress />;
  } else if (data.error) {
    console.log(data.error);
    return <Typography>Something went wrong</Typography>;
  }
  return data.newsArticles.length > 0 ? (
    <div>
      <Typography variant="h5" gutterBottom>
        News from CMS
      </Typography>
      <List>
        {data.newsArticles.map(article => (
          <ListItem title={article.articleText}>
            <ListItemAvatar>
              <Avatar
                src={article.imageModel && article.imageModel.crops ? article.imageModel.crops.profile : undefined}
              >
                N
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary={article.title} secondary={article.articleType && article.articleType.title} />
          </ListItem>
        ))}
      </List>
      {/* <Grid container spacing={16}>
        {data.newsArticles.map(article => {
          return (
            <Grid item xs={12} sm={6} md={6} key={article._id}>
              <Card className={classes.card}>
                <CardHeader />
                {article.imageModel && article.imageModel.crops ? (
                  <CardMedia className={classes.media} image={article.imageModel.crops.large} />
                ) : (
                  <div className={classes.media} />
                )}
                <CardContent>
                  <Typography>{article.articleText}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid> */}
      <br />
    </div>
  ) : (
    <Button
      color="secondary"
      variant="raised"
      component={(props: any) => <Link {...props} to="/admin/content/newsArticle" />}
    >
      Click to add some content
    </Button>
  );
};

const QUERY = gql`
  {
    newsArticles: newsArticleGetAll {
      _id
      title
      articleText
      imageModel {
        crops {
          large
          profile
        }
      }
      articleType {
        title
      }
    }
  }
`;

export default compose(
  graphql(QUERY),
  withStyles(styles)
)(News) as React.ComponentType<NewsProps>;
