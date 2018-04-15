import React from 'react'
import { Router, Route, Switch } from 'dva/router'

import index from './index/index'
import device from './pages/device-manage/router'
import update from './pages/update-manage/router'
import user from './pages/user-manage/router'

const routes = [{ path: '/', component: index }, ...device, ...update, ...user]
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((router, index) => {
              return (
                <Route key={index} path={router.path} exact component={router.component} />
              )
          })}
      </Switch>
    </Router>
  )
}

export default RouterConfig
