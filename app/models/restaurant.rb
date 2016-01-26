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
  validates :name, :address, :lat, :lng, presence: true;
  validates :price_range, inclusion: { in: 1..4 }

  def self.filtered(restaurants, filters)
    if filters["bounds"]
      Restaurant.in_bounds(restaurants, filters["bounds"])
    end
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
