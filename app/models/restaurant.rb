# == Schema Information
#
# Table name: restaurants
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  address     :string           not null
#  lat         :float            not null
#  lng         :float            not null
#  price_range :integer          not null
#  url         :string
#  photo_url   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Restaurant < ActiveRecord::Base
  include PgSearch
  pg_search_scope :name_starts_with,
                   against: :name,
                   using: {
                     tsearch: { prefix: true }
                   }

  multisearchable against: [:name],
                  using: {
                    tsearch: { prefix: true }
                  }

  validates :name, :address, :lat, :lng, presence: true;
  validates :price_range, inclusion: { in: 1..4 }

  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user

  def self.filtered(restaurants, filters)
    if filters["bounds"]
      restaurants = Restaurant.in_bounds(restaurants, filters["bounds"])
    end

    if filters["max_price"]
      restaurants = Restaurant.in_price_range(restaurants, filters["max_price"])
    end

    restaurants.limit(10)
  end

  def self.in_price_range(restaurants, max_price_string)
    max_price = max_price_string.to_i

    restaurants.where("price_range <= ?", max_price)
  end

  def self.in_bounds(restaurants, bounds)
    ne, sw = Restaurant.convert_bounds(bounds)

    restaurants.where(lat: sw["lat"]..ne["lat"])
         .where(lng: sw["lng"]..ne["lng"])
  end

  def self.convert_bounds(bounds)
    ne, sw = {}, {}

    bounds["northEast"].each do |key, value|
      ne[key] = value.to_f
    end

    bounds["southWest"].each do |key, value|
      sw[key] = value.to_f
    end
    return [ne, sw]
  end
end
