# == Schema Information
#
# Table name: restaurants
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  address     :string           not null
#  lat         :float            not null
#  lng         :float            not null
#  price_range :integer          not null
#  url         :string
#  photo_url   :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Restaurant < ActiveRecord::Base
end
