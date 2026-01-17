# == Schema Information
#
# Table name: follows
#
#  id          :bigint           not null, primary key
#  follower_id :bigint           not null
#  followed_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Follow < ApplicationRecord
  validates :follower_id, presence: true
  validates :followed_id, presence: true
  validates :follower_id, uniqueness: { scope: :followed_id }
  validate :cannot_follow_self

  belongs_to :follower,
             foreign_key: :follower_id,
             class_name: "User"

  belongs_to :followed,
             foreign_key: :followed_id,
             class_name: "User"

  private

  def cannot_follow_self
    if follower_id.present? && follower_id == followed_id
      errors.add(:followed_id, "cannot follow yourself")
    end
  end
end
