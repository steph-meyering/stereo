class Api::RepostsController < ApplicationController
  before_action :require_logged_in
  before_action :set_song

  def create
    repost = @song.reposts.find_or_initialize_by(user_id: current_user.id)
    if repost.save
      render "api/songs/show"
    else
      render json: repost.errors.full_messages, status: 422
    end
  end

  def destroy
    repost = @song.reposts.find_by(user_id: current_user.id)
    if repost
      repost.destroy
      render "api/songs/show"
    else
      render json: ["Repost not found"], status: 404
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
