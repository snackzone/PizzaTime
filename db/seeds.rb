# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Restaurant.destroy_all
User.destroy_all

Restaurant.create!(
  name: "Vinnie's Pizzeria",
  address: "253 Nassau Ave, Brooklyn, NY 1122",
  lat: 40.725927,
  lng: -73.941851,
  price_range: 1,
  url: "http://www.vinniesbrooklyn.com",
  photo_url: "http://i.imgur.com/jMuFvgC.jpg"
)

Restaurant.create!(
  name: "Lombardi's Pizza",
  address: "32 Spring St, New York, NY 10012",
  lat: 40.721587,
  lng: -73.995533,
  price_range: 2,
  url: "http://www.firstpizza.com",
  photo_url: "http://i.imgur.com/klHb9CO.jpg"
)

Restaurant.create!(
  name: "L&B Spumoni Gardens",
  address: "2725 86th St, Brooklyn, NY 11223",
  lat: 40.594716,
  lng: -73.981495,
  price_range: 1,
  url: "http://www.spumonigardens.com",
  photo_url: "http://i.imgur.com/D3hvyKt.jpg"
)

Restaurant.create!(
  name: "Louie & Ernie's Pizza",
  address: "1300 Crosby Ave, Bronx, NY 10461",
  lat: 40.838182,
  lng: -73.828850,
  price_range: 1,
  photo_url: "http://i.imgur.com/JNRw8Ax.jpg"
)

Restaurant.create!(
  name: "Joe's Pizza",
  address: "7 Carmine Street, New York, NY 10014",
  lat: 40.730449,
  lng: -74.002147,
  price_range: 1,
  url: "http://www.joespizzanyc.com",
  photo_url: "http://i.imgur.com/41GXzBQ.jpg"
)

Restaurant.create!(
  name: "Paulie Gee's",
  address: "60 Greenpoint Ave, Brooklyn, NY 11222",
  lat: 40.729805,
  lng: -73.958404,
  price_range: 2,
  url: "http://www.pauliegee.com",
  photo_url: "http://i.imgur.com/PMP9uDn.jpg?1"
)

User.create!(
  firstname: "Joey",
  surname: "Pepperoni",
  email: "guest@pizza-time.com",
  zip: "11222",
  password: "pizzatime"
)

User.create!(
  firstname: "Zach",
  surname: "Moroni",
  email: "zachary.moroni@gmail.com",
  zip: "11222",
  password: "zachzach"
)
























##
