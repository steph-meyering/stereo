class Api::SongsController < ApplicationController
    def show
        @song = Song.find(params[:id])
        render :show
    end

    # def song_params
    #     params.require(:song).permit(:title)???
    # end
end
