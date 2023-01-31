class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at

  belongs_to :user
end
