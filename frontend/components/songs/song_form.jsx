import React from 'react';

class SongForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            genre: "",
            artistId: 1,
            file: null,
            photo: null
        }
        this.handleFile = this.handleFile.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleFile(e) {
        this.setState({ file: e.currentTarget.files[0] });
    }
    
    handlePhoto(e) {
        this.setState({ photo: e.currentTarget.files[0] });
    }

    render(){
        console.log(this.state);
        return (
            <div className='song-upload-form-container'>
                <form className='song-upload-form'>
                    <div>
                        <input className='audio-upload' type="file" />
                    </div>
                    <div className='cover-preview'>
                        <input className='photo-upload' type="file"/>
                    </div>
                    <br/>
                    <div className='fields'>
                        <h3>Title *</h3>
                        <input 
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                        />
                        <br/>
                        <h3>Genre </h3>
                        <input
                            type="text"
                            value={this.state.genre}
                            onChange={this.update('genre')}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default SongForm;