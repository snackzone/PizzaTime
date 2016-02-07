json.extract! restaurant, :id, :name, :address, :price_range, :lat, :lng,
:photo_url, :url, :mean_rating

photos = restaurant.photos.sort do |a, b|
  b.created_at <=> a.created_at
end

json.photos photos do |photo|
  json.partial! 'api/photos/photo', photo: photo
end

reviews = restaurant.reviews.sort do |a, b|
  b.updated_at <=> a.updated_at
end

json.reviews reviews do |review|
  json.partial! 'api/reviews/review', review: review
end
