class Api::SongsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]
    before_action :set_song, only: [:update, :destroy]
    before_action :authorize_owner, only: [:update, :destroy]

    def show
        @song = Song.find(params[:id])
        render :show
    end

    def index
        @songs = Song.with_attached_file.with_attached_photo.includes(:artist).all
        render :index
    end

    
    def create
        @song = Song.new(song_params)
        @song.artist_id = current_user.id  # Ensure user can only create songs for themselves
        if @song.save
            render json: {message: 'upload successful'}
        else
            render json: @song.errors.full_messages, status: 422
        end
    end
    
    def update
        if @song.update_attributes(song_params)
            render :show
        else
            render json: @song.errors.full_messages, status: 422
        end
    end
    
    def destroy
        @song.destroy
        render json: { message: 'Song deleted successfully' }
    end
    
    private

    def set_song
        @song = Song.find_by(id: params[:id])
        unless @song
            render json: { errors: ['Song not found'] }, status: 404
        end
    end

    def authorize_owner
        return unless @song
        unless current_user.id == @song.artist_id || current_user.admin?
            render json: { errors: ['You are not authorized to perform this action'] }, status: 403
        end
    end
    
    def song_params
        params.require(:song).permit(:genre, :title, :file, :photo, :waveform)
    end
end