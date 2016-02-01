json.partial! 'api/users/user', user: @user

reviews = @user.reviews.sort do |a, b|
  b.created_at <=> a.created_at
end

json.reviews reviews do |review|
  json.partial! 'api/reviews/review', review: review
end
