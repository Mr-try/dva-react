import { connect } from 'dva-no-router'
import UserManage from './index'

function mapStateToProps({ update: { updateData } }) {
  return {
    updateData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUpdateData: () => dispatch({ type: 'update/getUpdateData' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
