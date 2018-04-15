import React, { PureComponent } from 'react'

export default class UserManage extends PureComponent {
  componentWillMount() {
    this.props.geUserData()
  }
  render() {
    return <div>UserManage</div>
  }
}
