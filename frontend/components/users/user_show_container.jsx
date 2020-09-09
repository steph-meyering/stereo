import { connect } from "react-redux";
import { requestUser } from "../../actions/user_actions";
import UserShow from "./user_show";

const mSTP = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.userId],
  };
};

const mDTP = (dispatch) => ({
  requestUser: (userId) => dispatch(requestUser(userId)),
});

export default connect(mSTP, mDTP)(UserShow);
