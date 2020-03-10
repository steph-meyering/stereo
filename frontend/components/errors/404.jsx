import React from 'react';

class NotFound extends React.Component{
    render(){
        return(
            <div className='error404'>
                <img src="https://a-v2.sndcdn.com/assets/images/404-339e640d.png" alt="404 error"/>
                <h1>We can't find that user </h1>
                <h2>A report has been sent to our tech team,</h2>
                <h2>and they’re looking into the problem.</h2>
                <h2>Please check back in a bit.</h2>
            </div>
        )
    }
}

export default NotFound;