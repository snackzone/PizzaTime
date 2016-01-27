# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile += %w( map_marker_solid.png )

(1..10).each do |n|
  Rails.application.config.assets.precompile += [ "#{n}_black.png"]
  Rails.application.config.assets.precompile += [ "#{n}_red.png"]
end

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
