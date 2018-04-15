import React, { Component } from 'react'

export default class DeviceManage extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  componentWillMount() {
    this.props.geDeviceData()
  }
  render() {
    return <div>设备管理</div>
  }
}
