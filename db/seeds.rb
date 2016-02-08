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
Photo.destroy_all
FortuneCookie.destroy_all

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

robertas = Restaurant.create!(
  name: "Roberta's",
  address: "261 Moore St, Brooklyn, NY 11206",
  lat: 40.704938,
  lng: -73.933565,
  url: "https://www.robertaspizza.com",
  photo_url: "http://i.imgur.com/DwkjB66.jpg",
  price_range: 3
)

prince_st = Restaurant.create!(
  name: "Prince St. Pizza",
  lat: 40.722897,
  lng: -73.994557,
  address: "27 Prince St, New York, NY 10012",
  photo_url: "http://i.imgur.com/FxHiu1A.jpg",
  price_range: 1
)

di_fara = Restaurant.create!(
  name: "Di Fara Pizza",
  lat: 40.625130,
  lng: -73.961691,
  address: "1424 Avenue J, Brooklyn, NY 11230",
  photo_url: "http://i.imgur.com/nIZMkeM.jpg",
  price_range: 2
)

zach = User.create!(
  firstname: "Zach",
  surname: "Moroni",
  email: "zachary.moroni@gmail.com",
  zip: "11222",
  password: "zachzach",
  photo: File.open("app/assets/images/zachary-moroni.jpg"),
  uid: "1066901750039886",
  provider: "facebook"
)

zach.reviews.create!(
  body: "Apparently one of the oldest pizza places in the world, old man Totonno pioneered the neapolitan style of baking at extremely high temperatures for a shorter period of time. A trip to Coney Island just doesn't feel complete to me if it doesn't end with this pizza.",
  rating: 5,
  restaurant_id: totonno.id
)

zach.reviews.create!(
  body: "PizzaTime's creation was fueled by a steady stream of Price St's pepperoni squares. Although usually I don't mess around with the thicker slices, I have to say there is something unique about their take on Sicilian-style pizza, particularly when topped with pepperoni. Great, greasy stuff.",
  rating: 4,
  restaurant_id: prince_st.id
)

zach.reviews.create!(
  body: "Over-priced? Overrated? Yes, and yes. However, that doesn't mean Roberta's isn't excellent. Their home-grown ingredients really shine here, as they combine them to make pies that are both familiar and original. Great place to take your visiting family who is terrified of Brooklyn.",
  rating: 4,
  restaurant_id: robertas.id
)

zach.reviews.create!(
  body: "My neighborhood slice, Vinnie's is my kryptonite at least once a week. Some real creativity goes into their specialty slices, which I started ordering once I realized that many of these combinations were around for one day only. Great vegan options, too.",
  rating: 3,
  restaurant_id: vinnies.id
)

joey = User.create!(
  firstname: "Joey",
  surname: "Pepperoni",
  email: "guest@pizza-time.com",
  zip: "11222",
  password: "pizzatime",
  photo: File.open("app/assets/images/jr.jpeg")
)

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
  pizza_rat.reviews.create!(
    restaurant_id: ids.pop,
    body: "squeak! squeak! squeak! squeak!",
    rating: 1,
  )
end

mike.reviews.create!(
  restaurant_id: vinnies.id,
  body: "Forgiveness is divine, but never pay full price for late pizza.",
  rating: 3
)

user_ids = User.pluck(:id);
restaurant_ids = Restaurant.pluck(:id);

(1..18).each do |num|
  user = User.find(user_ids.sample)
  id = restaurant_ids.sample
  user.photos.create!(
    upload: File.open("app/assets/images/user-uploads/#{num}.jpg"),
    restaurant_id: id
  )
end

FortuneCookie.create!(
  quote: "There’s no better feeling in the world than a warm pizza box on your lap.",
  author: "Kevin James"
)

FortuneCookie.create!(
  quote: "The perfect lover is one who turns into a pizza at 4:00 a.m.",
  author: "Charles Pierce"
)

FortuneCookie.create!(
  quote: "And I don’t cook, either. Not as long as they still deliver pizza.",
  author: "Tiger Woods"
)

FortuneCookie.create!(
  quote: "I think of dieting, then I eat pizza.",
  author: "Lara Stone"
)

FortuneCookie.create!(
  quote: "Everybody likes pizza! It's a quick and easy clean-up meal.",
  author: "Buddy Valastro"
)

FortuneCookie.create!(
  quote: "My love is pizza shaped. Won’t you have a slice? It’s circular, so there’s enough to go around. ",
  author: "Dora J. Arod"
)

FortuneCookie.create!(
  quote: "Those pizzas I ate were for medicinal purposes.",
  author: "Amy Neftzger"
)

FortuneCookie.create!(
  quote: "Pizza is like the entire food pyramid!",
  author: "Madeline Oles"
)

FortuneCookie.create!(
  quote: "There’s very little in my world that a foot massage and a thin-crust, everything-on-it pizza won’t set right.",
  author: "G.A. McKevett"
)

FortuneCookie.create!(
  quote: "Pizza makes me think that anything is possible.",
  author: "Henry Rollins"
)

ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle


joey.reviews.create!(
  restaurant_id: ids.pop,
  rating: 2,
  body: "Meh. Too greasy. I am a man of refined tastes and I demand more from my pizza."
)

joey.reviews.create!(
restaurant_id: ids.pop,
rating: 1,
body: "The worst. Will not be going back."
)

joey.reviews.create!(
restaurant_id: ids.pop,
rating: 4,
body: "Pretty good pizza!!!!!"
)

joey.reviews.create!(
  restaurant_id: ids.pop,
  rating: 3,
  body: "An ok slice. Gets the job done."
)

id = ids.pop
joey.reviews.create!(
  restaurant_id: ids.pop,
  rating: 5,
  body: "Amazing! #{Restaurant.find(id).name} is the best."
)


ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle

foodguy.reviews.create!(
  restaurant_id: ids.pop,
  rating: 1,
  body: "This is some terrible pizza."
)

foodguy.reviews.create!(
restaurant_id: ids.pop,
rating: 3,
body: "Not too shabby. I'd go back if I was in the neighborhood."
)

foodguy.reviews.create!(
  restaurant_id: ids.pop,
  rating: 2,
  body: "Ok for killing a hangover or taking care of a squeaky hinge."
)

foodguy.reviews.create!(
restaurant_id: ids.pop,
rating: 5,
body: "Truly the best. An institution."
)

foodguy.reviews.create!(
  restaurant_id: ids.pop,
  rating: 4,
  body: "I like this pizza!!!!!!!"
)

ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle

id = ids.pop
lena.reviews.create!(
restaurant_id: id,
rating: 5,
body: "Does not get better than #{Restaurant.find(id).name}"
)

lena.reviews.create!(
  restaurant_id: ids.pop,
  rating: 1,
  body: "Ugh. That was disgusting."
)

lena.reviews.create!(
  restaurant_id: ids.pop,
  rating: 2,
  body: "It's alright. I won't be going back."
)

lena.reviews.create!(
restaurant_id: ids.pop,
rating: 4,
body: "Good pizza! Great sauce-to-crust ratio."
)

lena.reviews.create!(
  restaurant_id: ids.pop,
  rating: 3,
  body: "A fine slice. Good sauce-to-crust ratio."
)



ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle

bill.reviews.create!(
  restaurant_id: ids.pop,
  rating: 1,
  body: "I don't know what I just ate, but it wasn't pizza."
)

bill.reviews.create!(
restaurant_id: ids.pop,
rating: 3,
body: "Have I eaten here? I can't remember."
)

bill.reviews.create!(
  restaurant_id: ids.pop,
  rating: 2,
  body: "Not great. Pretty bad, actually!"
)

id = ids.pop
bill.reviews.create!(
restaurant_id: id,
rating: 5,
body: "#{Restaurant.find(id).name} is without a doubt the best pizza you will ever eat."
)

bill.reviews.create!(
  restaurant_id: ids.pop,
  rating: 4,
  body: "Oh yeah. That's pizza. I know pizza. This is it."
)

ids = Restaurant.all.map { |restaurant| restaurant.id }.shuffle

snake.reviews.create!(
  restaurant_id: ids.pop,
  rating: 1,
  body: "Awful. Inedbible. Disgusting. Hyberbolic."
)

snake.reviews.create!(
restaurant_id: ids.pop,
rating: 4,
body: "Great pizza! You're gonna really like it!"
)

snake.reviews.create!(
  restaurant_id: ids.pop,
  rating: 2,
  body: "I definitely don't like this pizza."
)

id = ids.pop
snake.reviews.create!(
restaurant_id: id,
rating: 5,
body: "Wow! SO GOOD. Maybe the best."
)

snake.reviews.create!(
  restaurant_id: ids.pop,
  rating: 3,
  body: "Meh. Good pizza. I dunno. Fine, I guess."
)



















##
