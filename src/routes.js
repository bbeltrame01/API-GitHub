import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repos from './pages/Repos';
import Starred from './pages/Starred';

function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/:user/repos" component={Repos} />
        <Route path="/:user/starred" component={Starred} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;