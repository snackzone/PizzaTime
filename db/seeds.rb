# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Restaurant.destroy_all
User.destroy_all
Review.destroy_all

vinnies = Restaurant.create!(
  name: "Vinnie's Pizzeria",
  address: "253 Nassau Ave, Brooklyn, NY 1122",
  lat: 40.725927,
  lng: -73.941851,
  price_range: 1,
  url: "https://www.vinniesbrooklyn.com",
  photo_url: "https://i.imgur.com/jMuFvgC.jpg"
)

lombardis = Restaurant.create!(
  name: "Lombardi's Pizza",
  address: "32 Spring St, New York, NY 10012",
  lat: 40.721587,
  lng: -73.995533,
  price_range: 2,
  url: "https://www.firstpizza.com",
  photo_url: "https://i.imgur.com/klHb9CO.jpg"
)

l_and_b = Restaurant.create!(
  name: "L&B Spumoni Gardens",
  address: "2725 86th St, Brooklyn, NY 11223",
  lat: 40.594716,
  lng: -73.981495,
  price_range: 1,
  url: "https://www.spumonigardens.com",
  photo_url: "https://i.imgur.com/D3hvyKt.jpg"
)

louie_and_ernies = Restaurant.create!(
  name: "Louie & Ernie's Pizza",
  address: "1300 Crosby Ave, Bronx, NY 10461",
  lat: 40.838182,
  lng: -73.828850,
  price_range: 1,
  photo_url: "https://i.imgur.com/JNRw8Ax.jpg"
)

joes = Restaurant.create!(
  name: "Joe's Pizza",
  address: "7 Carmine Street, New York, NY 10014",
  lat: 40.730449,
  lng: -74.002147,
  price_range: 1,
  url: "https://www.joespizzanyc.com",
  photo_url: "https://i.imgur.com/41GXzBQ.jpg"
)

paulie_gees = Restaurant.create!(
  name: "Paulie Gee's",
  address: "60 Greenpoint Ave, Brooklyn, NY 11222",
  lat: 40.729805,
  lng: -73.958404,
  price_range: 2,
  url: "https://www.pauliegee.com",
  photo_url: "https://i.imgur.com/PMP9uDn.jpg?1"
)

grimaldis = Restaurant.create!(
  name: "Grimaldi's Pizza",
  address: "19-29 Old Fulton St, Brooklyn, NY 11201",
  lat: 40.702563,
  lng: -73.993332,
  price_range: 2,
  photo_url: "https://i.imgur.com/Jl5qEWn.jpg"
)

apizz = Restaurant.create!(
  name: "ápizz",
  address: "217 Eldridge St, New York, NY 10002",
  lat: 40.721682,
  lng: -73.990265,
  price_range: 3,
  photo_url: "https://i.imgur.com/OEXFnqK.jpg"
)

numero_28 = Restaurant.create!(
  name: "Numero 28 Pizzeria",
  address: "1431 1st Avenue, New York, NY 10021",
  lat: 40.769308,
  lng: -73.955084,
  price_range: 2,
  url: "https://www.numero28.com",
  photo_url: "https://i.imgur.com/2Ftxb7r.jpg"
)

bricco = Restaurant.create!(
  name: "Bricco",
  address: "304 W 56th St, New York, NY 10019",
  lat: 40.766167,
  lng: -73.984089,
  price_range: 3,
  url: "https://www.bricconyc.com",
  photo_url: "https://i.imgur.com/G1mR2Q9.jpg"
)

rizzos = Restaurant.create!(
  name: "Rizzo's Fine Pizza",
  address: "30-13 Steinway St, Astoria, NY 11103",
  lat: 40.763336,
  lng: -73.915199,
  price_range: 1,
  url: "https://rizzosfinepizza.com",
  photo_url: "https://i.imgur.com/F7TJ0bX.jpg"
)

totonno = Restaurant.create!(
  name: "Totonno Pizzeria Napolitana",
  address: "1524 Neptune Ave, Brooklyn, NY 11224",
  lat: 40.578899,
  lng: -73.983853,
  price_range: 2,
  url: "https://www.totonnosconeyisland.com",
  photo_url: "https://i.imgur.com/59y65Ip.jpg"
)

joey = User.create!(
  firstname: "Joey",
  surname: "Pepperoni",
  email: "guest@pizza-time.com",
  zip: "11222",
  password: "pizzatime",
  photo: File.open("app/assets/images/jr.jpeg")
)

zach = User.create!(
  firstname: "Zach",
  surname: "Moroni",
  email: "zachary.moroni@gmail.com",
  zip: "11222",
  password: "zachzach",
  photo: File.open("app/assets/images/zachary-moroni.jpg")
)

zach.reviews.create!(
  body: "Come for the pizza, stay for the attitude.",
  rating: 5,
  restaurant_id: totonno.id
)

Restaurant.all.each do |restaurant|
  joey.reviews.create!(
    restaurant_id: restaurant.id,
    rating: Random.new.rand(4..5),
    body: "My favorite slice is at #{restaurant.name}"
  )
end

mike = User.create!(
  firstname: "Mike",
  surname: "Turtle",
  zip: "10009",
  email: "mike@turtlepower.com",
  password: "cowabunga",
  photo: File.open("app/assets/images/michelangelo.jpg")
)

foodguy = User.create!(
  firstname: "Tony",
  surname: "Bourbon",
  zip: "10010",
  email: "foodguy@gmail.com",
  password: "foodguy",
  photo: File.open("app/assets/images/foodguy.jpg")
)

dog = User.create!(
  firstname: "Winston",
  surname: "The Dog",
  zip: "11206",
  email: "bigdawg@gmail.com",
  password: "bowwow",
  photo: File.open("app/assets/images/bulldog.jpg")
)

lena = User.create!(
  firstname: "Hannah",
  surname: "Dunwell",
  zip: "11222",
  email: "ld@gmail.com",
  password: "lenalena",
  photo: File.open("app/assets/images/lena.gif")
)

bill = User.create!(
  firstname: "William",
  surname: "Margrave",
  zip: "10023",
  password: "whoyagonnacall",
  photo: File.open("app/assets/images/bill.jpg"),
  email: "w.margrave@columbia.edu"
)

snake = User.create!(
  firstname: "Curtis",
  surname: "Rousseau",
  zip: "10003",
  password: "24hours",
  photo: File.open("app/assets/images/snake.jpg"),
  email: "snake1997@hotmail.com"
)

pizza_rat = User.create!(
  firstname: "Pizza",
  surname: "Rat",
  zip: "10002",
  password: "squeak",
  photo: File.open("app/assets/images/pizza-rat.jpg"),
  email: "pizzarat@mta.gov"
)


ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle
5.times do
  dog.reviews.create!(
    restaurant_id: ids.pop,
    body: "woof! woof! woof! woof!",
    rating: 5,
  )
end

ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle
5.times do
  foodguy.reviews.create!(
    restaurant_id: ids.pop,
    body: Faker::Hipster.sentences(3),
    rating: Random.new.rand(1..3)
  )
end

mike.reviews.create!(
  restaurant_id: vinnies.id,
  body: "Forgiveness is divine, but never pay full price for late pizza.",
  rating: 3
)


##This method isn't working yet.
user_ids = User.pluck(:id);
restaurant_ids = Restaurant.pluck(:id);

Dir.glob('/app/assets/images/user-uploads/*.jpg') do |photo|
  user = User.find(user_ids.sample)
  id = restaurant_ids.sample
  user.photos.create!(
    upload: File.open(photo),
    caption: Faker::Hipster.sentence,
    restaurant_id: id
  )
end
















##
