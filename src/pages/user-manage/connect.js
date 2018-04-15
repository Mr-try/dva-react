import { connect } from 'dva-no-router'
import UserManage from './index'

function mapStateToProps({ user: { userData } }) {
  return {
    userData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    geUserData: () => dispatch({ type: 'user/geUserData' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
