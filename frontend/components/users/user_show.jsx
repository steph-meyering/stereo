import React from "react";
import UserSidebar from "./user_sidebar";
import SongIndexContainer from "../songs/song_index_container";
class UserShowContainer extends React.Component {
    componentDidMount(){
        this.props.requestUser(this.props.match.params.userId)
    }

    render(){
        if (this.props.user === undefined) return null
        return(
            <div className='user-show-page'>
                <div className='user-show-div'>
                    <div>
                        <img className='profile-pic' src="https://i.pinimg.com/originals/8f/15/5c/8f155c9323941657c157c3ce8e4df589.jpg" alt=""/>
                    </div>
                    <div className='name-location'>
                        <h2 className='username'>{this.props.user.username}</h2>
                        <h3 className='location'>Location: {this.props.user.location}</h3>
                    </div>

                    {/* <h3>Bio: {this.props.user.about} </h3> */}
                </div>
                <div className='songs-and-sidebar'>
                    <SongIndexContainer/>
                    <UserSidebar/>
                </div>
            </div>
        )
    }
}

export default UserShowContainer;