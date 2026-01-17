class Api::LikesController < ApplicationController
  before_action :require_logged_in
  before_action :set_song

  def create
    like = @song.likes.find_or_initialize_by(user_id: current_user.id)
    if like.save
      render "api/songs/show"
    else
      render json: like.errors.full_messages, status: 422
    end
  end

  def destroy
    like = @song.likes.find_by(user_id: current_user.id)
    if like
      like.destroy
      render "api/songs/show"
    else
      render json: ["Like not found"], status: 404
    end
  end

  private

  def set_song
    @song = Song.find_by(id: params[:song_id])
    unless @song
      render json: { errors: ["Song not found"] }, status: 404
    end
  end
end
