json.array! @restaurants do |restaurant|
  json.name restaurant.name
  json.address restaurant.address
  json.url restaurant.url
  json.lat restaurant.lat
  json.lng restaurant.lng
  json.price_range restaurant.price_range
  json.id restaurant.id
end
