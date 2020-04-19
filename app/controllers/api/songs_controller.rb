class Api::SongsController < ApplicationController
    def show
        @song = Song.find(params[:id])
        render :show
    end

    def index
        @songs = Song.with_attached_file.with_attached_photo.includes(:artist).all
        render :index
    end

    
    def create
        debugger
        @song = Song.new(song_params)
        if @song.save
            render json: {message: 'upload successful'}
        else
            render json: @song.errors.full_messages, status: 422
        end
    end
    
    def update
        @song = Song.find_by(id: params[:id])
        if @song && @song.update_attributes(song_params)
            render :show
        else
            render json: @song.errors.full_messages, status: 422
        end
    end
    
    private
    
    def song_params
        params.require(:song).permit(:artist_id, :genre, :title, :updated_at, :file, :photo, :waveform)
    end
end