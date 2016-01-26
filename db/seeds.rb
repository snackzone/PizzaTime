# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Restaurant.destroy_all

Restaurant.create!(
  name: "Vinnie's Pizzeria",
  address: "253 Nassau Ave, Brooklyn, NY 1122",
  lat: 40.725927,
  lng: -73.941851,
  price_range: 1,
  url: "http://www.vinniesbrooklyn.com"
)
