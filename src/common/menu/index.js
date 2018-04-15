import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'

export default class SideBar extends Component {
  constructor() {
    super()
    this.menu = [
      { name: '设备管理', router: '/device-manage' },
      { name: '升级管理', router: '/update-manage' },
      { name: '用户管理', router: '/user-manage' },
    ]
  }
  render() {
    return (
      <div className='menu-wrap'>
        {this.menu.map((side, index) => {
          return (
            <NavLink key={side.router + index}
              className='menu'
              activeClassName='selected-menu'
              to={side.router}
            >{side.name}
            </NavLink>
          )
        })}
      </div>
    )
  }
}
