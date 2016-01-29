json.extract! user, :id, :firstname, :surname, :email, :zip
json.photo_url asset_path(user.photo.url(:original))
