# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  firstname          :string           not null
#  surname            :string           not null
#  email              :string           not null
#  zip                :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :firstname, :surname, :email, :password_digest,
  :session_token, presence: true

  validates :password_confirmation, presence: true, allow_nil: true

  validates :email, uniqueness: true

  validates_format_of :zip,
    with: /^\d{5}(-\d{4})?$/,
    multiline: true,
    allow_nil: true,
    message: "invalid zip"

  validates :password, length: { minimum: 6, allow_nil: true }, confirmation: true

  has_many :reviews
  has_many :reviewed_restaurants, through: :reviews, source: :restaurant
  has_many :photos

  attr_reader :password

  after_initialize :ensure_session_token

  has_attached_file :photo, default_url: "missing.png"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    debugger

    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    return user if user

    name = auth_hash[:info][:name].split(" ")
    firstname = name.first
    surname = name.last

    User.create(
      provider: provider,
      uid: uid,
      email: auth_hash[:info][:email],
      firstname: firstname,
      surname: surname,
      password: SecureRandom::urlsafe_base64
    )
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    save!
    session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
