require 'byebug'
# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  song_id    :bigint           not null
#  user_id    :bigint           not null
#  body       :text             not null
#  song_time  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
  belongs_to :song,
  foreign_key: :song_id,
  class_name: 'Song'

  belongs_to :user,
  foreign_key: :user_id,
  class_name: 'User'

  def self.search(song_id)
    comments = Comment.all
    debugger
    comments = comments.where(song_id: song_id)
    comments
  end
  
end
