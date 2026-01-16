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
  validates :body, presence: true, length: { maximum: 1000 }
  validates :song_id, :user_id, :song_time, presence: true
  
  before_validation :sanitize_body
  
  belongs_to :song,
  foreign_key: :song_id,
  class_name: 'Song'

  belongs_to :user,
  foreign_key: :user_id,
  class_name: 'User'

  def self.search(song_id)
    comments = Comment.all
    comments = comments.where(song_id: song_id)
    comments
  end

  private

  def sanitize_body
    # Strip dangerous HTML/script tags while preserving basic formatting
    # Rails automatically escapes output in views, but this adds an extra layer
    self.body = ActionController::Base.helpers.sanitize(
      body,
      tags: [],  # No HTML tags allowed
      attributes: []
    ).strip if body.present?
  end
end
