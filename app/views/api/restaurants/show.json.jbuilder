json.extract! @restaurant, :id, :name, :address, :price_range, :lat, :lng, :photo_url, :url

reviews = @restaurant.reviews.sort do |a, b|
  b.created_at <=> a.created_at
end

json.reviews reviews do |review|
  json.partial! 'api/reviews/review', review: review
end
