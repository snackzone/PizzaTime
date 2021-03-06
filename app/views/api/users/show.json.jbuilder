json.partial! 'api/users/user', user: @user

json.reviews @user.reviews do |review|
  json.partial! 'api/reviews/review', review: review, show_user: true
end

json.photos @user.photos do |photo|
  json.partial! 'api/photos/photo', photo: photo
end
