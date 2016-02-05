json.extract! photo, :caption, :user_id, :restaurant_id
json.url asset_path(photo.upload.url(:original))
