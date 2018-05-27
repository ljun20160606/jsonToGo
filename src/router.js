import React from 'react';
import { Redirect, Router, Route, Switch } from 'dva/router';
import Index from './routes/Index';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Redirect push to='/json'/>
        </Route>
        <Route path="/json" exact component={Index}/>
        <Route path="/yaml" exact component={Index}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
