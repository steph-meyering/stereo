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
    
    # def song_params
    #     params.require(:song).permit(:title)???
    # end
end
