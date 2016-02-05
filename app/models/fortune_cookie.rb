class FortuneCookie < ActiveRecord::Base
  validates :author, :quote, presence: true
end
