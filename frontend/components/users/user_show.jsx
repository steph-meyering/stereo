import React from "react";
class UserShowContainer extends React.Component {
    componentDidMount(){
        this.props.requestUser(this.props.match.params.userId)
    }

    render(){
        if (this.props.user === undefined) return null
        return(
            <div className='user-show-div'>
                <ul>
                    <h1>Username: {this.props.user.username}</h1>
                    <li>Email: {this.props.user.email}</li>
                    <li>Location: {this.props.user.location}</li>
                    <li>Bio: {this.props.user.about} </li>
                </ul>
            </div>
        )
    }
}

export default UserShowContainer;