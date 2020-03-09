class Api::SongsController < ApplicationController
    def show
        @song = Song.find(params[:id])
        render :show
    end

    def index
        @songs = Song.with_attached_file.all
        # @songs = Song.all
        render :index
    end

    def create
        @song = Song.new(song_params)
        if @song.save
            render '/api/songs/'
        end
    end
    
    def song_params
        params.require(:song).permit(:title, :genre)
    end
end
