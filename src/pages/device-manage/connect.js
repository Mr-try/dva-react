import { connect } from 'dva-no-router'
import DeviceManage from './index'

function mapStateToProps({ device: { deviceData } }) {
  return {
    deviceData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    geDeviceData: () => dispatch({ type: 'device/geDeviceData' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManage)
