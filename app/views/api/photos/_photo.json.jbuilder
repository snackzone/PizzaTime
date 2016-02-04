json.extract! photo, :caption, :user_id
json.url asset_path(photo.upload.url(:original))
