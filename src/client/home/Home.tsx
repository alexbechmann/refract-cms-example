import React from 'react';
import News from '../news/News';
import Products from '../products/Products';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';

const Home = () => (
  <div>
    <News />
    <Products />
    <Link to="/admin">Go to dashboard to add/edit some data</Link>
  </div>
);

export default Home;
