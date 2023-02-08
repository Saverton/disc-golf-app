class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :full_name, :notifications?
end
