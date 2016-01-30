# == Schema Information
#
# Table name: reviews
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  restaurant_id :integer          not null
#  rating        :integer          not null
#  body          :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Review < ActiveRecord::Base
  validates :user_id, :restaurant_id, presence: true
  validates :user_id, uniqueness: { scope: :restaurant_id,
        message: "Users may not review a restaurant more than once." }

  validates :rating, inclusion: { in: 1..5 }
  validates :body, length: {maximum: 300}

  belongs_to :user
  belongs_to :restaurant
end
