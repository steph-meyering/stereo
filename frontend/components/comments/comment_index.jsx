import React from "react";
import CommentIndexItem from "./comment_index_item";

class CommentIndex extends React.Component{
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
    let commentItems = this.props.comments.reverse().map((comment) => (
      <CommentIndexItem
        key={comment.id} 
        comment={comment}
      />
    ));
    return(
      <div id="comment-section">
        <div>{commentItems.length} comments</div>
        <ul>
          {commentItems}
        </ul>
      </div>
    )
  }
}

export default CommentIndex;