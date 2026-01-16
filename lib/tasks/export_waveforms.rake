namespace :waveforms do
  desc "Export waveform data for all songs"
  task export: :environment do
    Song.all.each do |song|
      if song.waveform.present?
        puts "song#{song.id}_waveform = '#{song.waveform}'"
        puts ""
      else
        puts "# Song #{song.id} (#{song.title}) - no waveform data yet"
      end
    end
  end
end
