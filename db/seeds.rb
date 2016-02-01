# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Restaurant.destroy_all
User.destroy_all

vinnies = Restaurant.create!(
  name: "Vinnie's Pizzeria",
  address: "253 Nassau Ave, Brooklyn, NY 1122",
  lat: 40.725927,
  lng: -73.941851,
  price_range: 1,
  url: "http://www.vinniesbrooklyn.com",
  photo_url: "http://i.imgur.com/jMuFvgC.jpg"
)

lombardis = Restaurant.create!(
  name: "Lombardi's Pizza",
  address: "32 Spring St, New York, NY 10012",
  lat: 40.721587,
  lng: -73.995533,
  price_range: 2,
  url: "http://www.firstpizza.com",
  photo_url: "http://i.imgur.com/klHb9CO.jpg"
)

l_and_b = Restaurant.create!(
  name: "L&B Spumoni Gardens",
  address: "2725 86th St, Brooklyn, NY 11223",
  lat: 40.594716,
  lng: -73.981495,
  price_range: 1,
  url: "http://www.spumonigardens.com",
  photo_url: "http://i.imgur.com/D3hvyKt.jpg"
)

louie_and_ernies = Restaurant.create!(
  name: "Louie & Ernie's Pizza",
  address: "1300 Crosby Ave, Bronx, NY 10461",
  lat: 40.838182,
  lng: -73.828850,
  price_range: 1,
  photo_url: "http://i.imgur.com/JNRw8Ax.jpg"
)

joes = Restaurant.create!(
  name: "Joe's Pizza",
  address: "7 Carmine Street, New York, NY 10014",
  lat: 40.730449,
  lng: -74.002147,
  price_range: 1,
  url: "http://www.joespizzanyc.com",
  photo_url: "http://i.imgur.com/41GXzBQ.jpg"
)

paulie_gees = Restaurant.create!(
  name: "Paulie Gee's",
  address: "60 Greenpoint Ave, Brooklyn, NY 11222",
  lat: 40.729805,
  lng: -73.958404,
  price_range: 2,
  url: "http://www.pauliegee.com",
  photo_url: "http://i.imgur.com/PMP9uDn.jpg?1"
)

grimaldis = Restaurant.create!(
  name: "Grimaldi's Pizza",
  address: "19-29 Old Fulton St, Brooklyn, NY 11201",
  lat: 40.702563,
  lng: -73.993332,
  price_range: 2,
  photo_url: "http://i.imgur.com/Jl5qEWn.jpg"
)

apizz = Restaurant.create!(
  name: "ápizz",
  address: "217 Eldridge St, New York, NY 10002",
  lat: 40.721682,
  lng: -73.990265,
  price_range: 3,
  photo_url: "http://i.imgur.com/OEXFnqK.jpg"
)

numero_28 = Restaurant.create!(
  name: "Numero 28 Pizzeria",
  address: "1431 1st Avenue, New York, NY 10021",
  lat: 40.769308,
  lng: -73.955084,
  price_range: 2,
  url: "http://www.numero28.com",
  photo_url: "http://i.imgur.com/2Ftxb7r.jpg"
)

bricco = Restaurant.create!(
  name: "Bricco",
  address: "304 W 56th St, New York, NY 10019",
  lat: 40.766167,
  lng: -73.984089,
  price_range: 3,
  url: "http://www.bricconyc.com",
  photo_url: "http://i.imgur.com/G1mR2Q9.jpg"
)

rizzos = Restaurant.create!(
  name: "Rizzo's Fine Pizza",
  address: "30-13 Steinway St, Astoria, NY 11103",
  lat: 40.763336,
  lng: -73.915199,
  price_range: 1,
  url: "http://rizzosfinepizza.com",
  photo_url: "http://i.imgur.com/F7TJ0bX.jpg"
)

totonno = Restaurant.create!(
  name: "Totonno Pizzeria Napolitana",
  address: "1524 Neptune Ave, Brooklyn, NY 11224",
  lat: 40.578899,
  lng: -73.983853,
  price_range: 2,
  url: "http://www.totonnosconeyisland.com",
  photo_url: "http://i.imgur.com/59y65Ip.jpg"
)

joey = User.create!(
  firstname: "Joey",
  surname: "Pepperoni",
  email: "guest@pizza-time.com",
  zip: "11222",
  password: "pizzatime"
)

zach = User.create!(
  firstname: "Zach",
  surname: "Moroni",
  email: "zachary.moroni@gmail.com",
  zip: "11222",
  password: "zachzach"
)

zach.reviews.create!(
  body: "come for the pizza, stay for the attitude.",
  rating: 5,
  restaurant_id: totonno.id
)

Restaurant.all.each do |restaurant|
  joey.reviews.create!(
    restaurant_id: restaurant.id,
    rating: Random.new.rand(1..5),
    body: "My favorite slice is at #{restaurant.name}"
  )
end























##
