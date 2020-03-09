import React from "react";
class UserShowContainer extends React.Component {
    componentDidMount(){
        this.props.requestUser(this.props.match.params.userId)
    }

    render(){
        if (this.props.user === undefined) return null
        return(
            <div className='user-show-div'>
                <div className='profile-pic'></div>
                <div className='name-location'>
                    <h2 className='username'>{this.props.user.username}</h2>
                    <h3 className='location'>Location: {this.props.user.location}</h3>
                </div>

                <h3>Bio: {this.props.user.about} </h3>
            </div>
        )
    }
}

export default UserShowContainer;