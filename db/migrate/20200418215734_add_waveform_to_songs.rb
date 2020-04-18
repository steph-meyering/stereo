class AddWaveformToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :waveform, :json
  end
end
