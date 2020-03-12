import React from 'react';
import { uploadSong } from '../../actions/song_actions';

class SongForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            genre: "",
            artistId: this.props.currentUserId,
            file: null,
            photo: null,
            photoUrl: null
        }
        this.handleFile = this.handleFile.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const photoFile = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ photo: photoFile, photoUrl: fileReader.result });
        };
        if (photoFile) {
            fileReader.readAsDataURL(photoFile)
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('song[title]', this.state.title);
        formData.append('song[genre]', this.state.genre);
        formData.append('song[artist_id]', this.state.artistId);
        formData.append('song[file]', this.state.file);
        formData.append('song[photo]', this.state.photo);
        this.props.uploadSong(formData)
        
    }

    render(){
        console.log(this.state);
        const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : <div className='place-holder-cover'></div>;
        return (
            <div className='upload-background'>
                <div className='song-upload-form-container'>
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <h3>Please select an audio file to upload </h3>
                        <input
                            className='audio-upload'
                            type="file"
                            onChange={this.handleFile}
                        />
                        <div className='song-upload-form'>
                            <div className='cover-photo-div'>                    
                                <div className='cover-preview'>
                                    {preview}
                                    <input
                                        className='photo-upload'
                                        type="file"
                                        onChange={this.handlePhoto}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className='fields-div'>
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
                                <br />
                                {/* <h3>Artist ID </h3>
                                <input
                                    type="text"
                                    value={this.state.artistId}
                                    onChange={this.update('artistId')}
                                />
                                <br/> */}
                            </div>
                        </div>
                        <button className='cancel-upload' >Cancel</button>
                        <button className='save-upload' type="submit" >Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SongForm;