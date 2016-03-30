import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Header from './../components/general/header.jsx';

import Dashboard from './../components/route_handlers/dashboard/root.jsx';
import StaffMembers from './../components/route_handlers/staff_members/root.jsx';
import WeeklyWins from './../components/route_handlers/weekly_wins/root.jsx';
import Resources from './../components/route_handlers/resources/root.jsx';
import Readmes from './../components/route_handlers/readmes/root.jsx';
import FloorPlansPage from './../components/route_handlers/floor_plans/root.jsx';
import FrontDesk from './../components/route_handlers/front_desk/root.jsx';

import models from './../models/index.js';
import resourceRouteGenerator from './../components/route_handlers/helpers/resource_route_generator.jsx';

// Main app component.
function App(props) {
  return (
    <div className='wrapper'>
      <Header user={window.user}/>
      {props.children}
    </div>
  );
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>

      <IndexRoute component={Dashboard} />

      <Route path='staff-directory' component={StaffMembers}/>
      <Route path='weekly-wins' component={WeeklyWins}/>
      <Route path='readmes' component={Readmes}/>
      <Route path='resources' component={Resources}/>
      <Route path='floor-plans' component={FloorPlansPage}/>
      <Route path='frontdesk' component={FrontDesk}/>

      { resourceRouteGenerator(models.readme.Model) }
      { resourceRouteGenerator(models.faq.Model) }
      { resourceRouteGenerator(models.resource.Model) }
      { resourceRouteGenerator(models.weeklyWin.Model) }
      { resourceRouteGenerator(models.staffMember.Model) }
      { resourceRouteGenerator(models.department.Model) }

    </Route>
  </Router>
);

export default routes;
