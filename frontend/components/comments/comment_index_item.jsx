import React from "react";

class CommentIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.timeSince = this.timeSince.bind(this);
  }

  timeSince(dateStr){
    let date = Date.parse(dateStr)
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      let years = Math.floor(interval);
      let unit = years < 2 ? " year" : " years";
      return years + unit + " ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      let months = Math.floor(interval);
      let unit = months < 2 ? " month" : " months";
      return months + unit + " ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      let days = Math.floor(interval);
      let unit = days < 2 ? " day" : " days";
      return days + unit + " ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      let hours = Math.floor(interval);
      let unit = hours < 2 ? " hour" : " hours";
      return hours + unit +" ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      let minutes = Math.floor(interval);
      let unit = minutes < 2 ? " minute" : " minutes";
      return minutes + unit + " ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  
  render(){
    let comment = this.props.comment;
    return (
      <div className="comment">
        <div className="comment-owner-photo"></div>
        <div className="comment-main">
          <div className="comment-top">
            <div className="comment-top-left">
              <div className="comment-link-font">{comment.commenter}</div>
              <div className="comment-at">at</div>
              <div className="comment-link-font"> {comment.songTime}</div>
            </div>
            <div className="comment-time-posted">
              {this.timeSince(comment.updatedAt)}
            </div>
          </div>
          <div className="comment-body">{comment.body}</div>
        </div>
      </div>
    );
  }
}

export default CommentIndexItem;