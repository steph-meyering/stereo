class Api::PlaylistsController < ApplicationController
  before_action :require_logged_in, except: [:show, :index]
  before_action :set_playlist, only: [:show, :update, :destroy]
  before_action :authorize_owner, only: [:update, :destroy]

  def index
    @playlists = Playlist.includes(:user).all
    render :index
  end

  def show
    render :show
  end

  def create
    @playlist = current_user.playlists.new(playlist_params)
    if @playlist.save
      render :show
    else
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  def update
    if @playlist.update(playlist_params)
      render :show
    else
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist.destroy
    render json: { message: "Playlist deleted successfully" }
  end

  private

  def set_playlist
    @playlist = Playlist.includes(playlist_songs: :song).find_by(id: params[:id])
    unless @playlist
      render json: { errors: ["Playlist not found"] }, status: 404
    end
  end

  def authorize_owner
    return unless @playlist
    unless current_user.id == @playlist.user_id || current_user.admin?
      render json: { errors: ["You are not authorized to perform this action"] }, status: 403
    end
  end

  def playlist_params
    params.require(:playlist).permit(:title, :private)
  end
end
