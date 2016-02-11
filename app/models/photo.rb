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

class Photo < ActiveRecord::Base
  validates :user_id, :restaurant_id, presence: true
  validates :upload, presence: true
  validates :caption, length: { maximum: 100 }

  has_attached_file :upload, default_url: "missing.png"
  validates_attachment_content_type :upload, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  belongs_to :restaurant

  default_scope { order('updated_at DESC') }
end
