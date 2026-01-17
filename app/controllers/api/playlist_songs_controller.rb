class Api::PlaylistSongsController < ApplicationController
  before_action :require_logged_in
  before_action :set_playlist
  before_action :authorize_owner

  def create
    position = playlist_song_params[:position] || @playlist.playlist_songs.count + 1
    playlist_song = @playlist.playlist_songs.new(
      song_id: playlist_song_params[:song_id],
      position: position
    )
    if playlist_song.save
      render "api/playlists/show"
    else
      render json: playlist_song.errors.full_messages, status: 422
    end
  end

  def destroy
    playlist_song = @playlist.playlist_songs.find_by(song_id: params[:id])
    if playlist_song
      playlist_song.destroy
      render "api/playlists/show"
    else
      render json: ["Playlist song not found"], status: 404
    end
  end

  def update
    playlist_song = @playlist.playlist_songs.find_by(song_id: params[:id])
    if playlist_song && playlist_song.update(position: playlist_song_params[:position])
      render "api/playlists/show"
    else
      render json: ["Playlist song not found"], status: 404
    end
  end

  private

  def set_playlist
    @playlist = Playlist.find_by(id: params[:playlist_id])
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

  def playlist_song_params
    params.require(:playlist_song).permit(:song_id, :position)
  end
end
