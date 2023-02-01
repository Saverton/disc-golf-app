class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at

  belongs_to :user
  has_many :comments
end
