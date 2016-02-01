json.extract! review, :id, :body, :rating
json.date(review.created_at.strftime('%m/%d/%Y'))
json.restaurant do |json|
  json.(review.restaurant, :id, :name, :address, :price_range, :photo_url)
end
