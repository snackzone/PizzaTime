json.extract! review, :id, :body, :rating, :created_at
json.restaurant do |json|
  json.(review.restaurant, :id, :name, :photo_url)
ends
