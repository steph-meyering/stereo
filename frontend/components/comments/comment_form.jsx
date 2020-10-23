import React from "react";
import { connect } from "react-redux";
import { postComment } from "../../actions/comment_actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      songId: this.props.songId,
      body: "",
      songTime: 0,
    };
    this.loggedIn = !!this.props.userId;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = Object.assign({}, this.state)
    this.props.postComment(this.state.userId, comment)
      .then(() => this.setState({ body: "" }))
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
        <div id="commenter-profile-pic-thumbnail"></div>
        <form onSubmit={this.handleSubmit} id="comment-form">
          <input
            placeholder={this.loggedIn ? "Write a comment" : "Sign in to leave a comment"}
            disabled={!this.loggedIn}
            type="text"
            id="comment-body-input"
            onChange={this.update("body")}
            value={this.state.body}
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