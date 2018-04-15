import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import SideBar from '../pages/common/menu'
import Header from '../pages/common/header'
import device from '../pages/device-manage/router'
import update from '../pages/update-manage/router'
import user from '../pages/user-manage/router'
import './index.css'

const routes = [...device, ...update, ...user]
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className='content-main'>
            <div className='content-left'>
              <SideBar />
            </div>
            <div className='content-right'>{renderRoutes(routes)}</div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
