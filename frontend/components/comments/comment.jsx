import React from "react";

class Comment extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchComments(this.props.songId);
  }

  render(){
    if (this.props.comments.length === 0){
      return null
    }
    let commentItems = this.props.comments.map((comment) => (
      <div key={comment.id}>
        <div>{comment.userId}</div>
        <div>{comment.body}</div>
      </div>
    ));
    return(
      <div>
        <ul>
          {commentItems}
        </ul>
      </div>
    )
  }
}

export default Comment;