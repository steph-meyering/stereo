# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  song_id    :bigint           not null
#  user_id    :bigint           not null
#  body       :text
#  song_time  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
