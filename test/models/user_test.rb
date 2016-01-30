# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  firstname          :string           not null
#  surname            :string           not null
#  email              :string           not null
#  zip                :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
