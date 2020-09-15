import React from "react";
import { connect } from "react-redux";
import { postComment } from "../../actions/comment_actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.userId,
      song_id: this.props.songId,
      body: null,
      song_time: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("comment[user_id]", this.state.userId);
    // formData.append("comment[song_id]", this.state.songId);
    // formData.append("comment[body]", this.state.body);
    // formData.append("comment[song_time]", this.state.songTime);
    const comment = Object.assign({}, this.state)
    this.props.postComment(this.state.userId, comment).then(console.log("success"))
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  render() {
    return (
      <div id="comment-form-container">
        <div>user profile pic thumbnail + user name</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="comment-body-input"
            onChange={this.update("body")}
          />
        </form>
      </div>
    );
  }
}

const mSTP = (state) => ({
  userId: state.session.id,
});

const mDTP = (dispatch) => ({
  postComment: (songId, comment) => dispatch(postComment(songId, comment))
})

export default connect(mSTP, mDTP)(CommentForm)