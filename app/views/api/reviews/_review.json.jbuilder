json.review do
  json.restaurant_name       review.restaurant.name
  json.restaurant_id         review.restaurant_id
  json.restaurant_photo_url  review.restaurant.photo_url
  json.rating                review.rating
  json.body                  review.body
  json.created_at            review.created_at
end
