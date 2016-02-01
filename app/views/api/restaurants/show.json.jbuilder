json.extract! @restaurant, :id, :name, :address, :price_range, :lat, :lng, :photo_url, :url

json.reviews @restaurant.reviews do |review|
  json.partial! 'api/reviews/review', review: review
end
