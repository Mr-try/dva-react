import React, { PureComponent } from 'react'

export default class UpdateManage extends PureComponent {
  componentWillMount() {
    this.props.getUpdateData()
  }
  render() {
    return <div>UpdateManage</div>
  }
}
