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
  validates :user, :restaurant, presence: true
  validates :user, uniqueness: { scope: :restaurant,
        message: "may not review a restaurant more than once." }

  validates :rating, inclusion: { in: 1..5 }
  validates :body, length: {minimum: 20, maximum: 300}

  belongs_to :user
  belongs_to :restaurant
end