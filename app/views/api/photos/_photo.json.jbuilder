json.extract! photo, :caption, :user_id, :restaurant_id
json.date(photo.created_at.localtime.strftime('%m/%d/%Y'))
json.restaurant_name photo.restaurant.name
json.url asset_path(photo.upload.url(:original))
