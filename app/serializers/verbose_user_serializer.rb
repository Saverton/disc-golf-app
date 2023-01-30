class VerboseUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :zip_code

  has_many :friends, limit: 10
end
