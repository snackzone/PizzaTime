json.partial! 'api/users/user', user: @user

reviews = @user.reviews.sort do |a, b|
  b.created_at <=> a.created_at
end

json.reviews reviews do |review|
  json.partial! 'api/reviews/review', review: review
end

photos = @user.photos.sort do |a, b|
  b.created_at <=> a.created_at
end

json.photos photos do |photo|
  json.partial! 'api/photos/photo', photo: photo
end
