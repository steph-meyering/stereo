import React from "react";

class CommentIndexItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    let comment = this.props.comment;
    return(
      <div className='comment'>
        <div className='comment-owner-photo'>
          place holder
        </div>
        <div className='comment-main'> 
          <div className='comment-top'>
            <div>{comment.commenter} at {comment.songTime}</div>
            <div className='time posted'>{comment.updatedAt}</div>
          </div>
          <div className='comment-body'>{comment.body}</div>
        </div>
      </div>
    )
  }
}

export default CommentIndexItem;