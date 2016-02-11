json.extract! review, :id, :body, :rating
json.date(review.updated_at.localtime.strftime('%m/%d/%Y'))

show_restaurant ||= false
unless show_restaurant
  json.restaurant do |json|
    json.(review.restaurant, :id, :name, :address, :price_range, :photo_url)
  end
end

show_user ||= false
unless show_user
  json.author do |json|
    json.(review.user, :id, :firstname, :surname)
    json.photo_url asset_path(review.user.photo.url(:original))
  end
end
