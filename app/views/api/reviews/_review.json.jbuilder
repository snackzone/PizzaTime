json.extract! review, :id, :body, :rating
json.date(review.updated_at.localtime.strftime('%m/%d/%Y'))

json.restaurant do |json|
  json.(review.restaurant, :id, :name, :address, :price_range, :photo_url)
end

json.author do |json|
  json.(review.user, :id, :firstname, :surname)
  json.photo_url asset_path(review.user.photo.url(:original))
end
