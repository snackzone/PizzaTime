json.partial! 'api/restaurants/restaurant', restaurant: @restaurant

json.photos @restaurant.photos do |photo|
  json.partial! 'api/photos/photo', photo: photo
end

json.reviews @restaurant.reviews do |review|
  json.partial! 'api/reviews/review', review: review, show_restaurant: true
end
