# == Schema Information
#
# Table name: photos
#
#  id                  :integer          not null, primary key
#  user_id             :integer          not null
#  restaurant_id       :integer          not null
#  caption             :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  upload_file_name    :string
#  upload_content_type :string
#  upload_file_size    :integer
#  upload_updated_at   :datetime
#

require 'test_helper'

class PhotoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
