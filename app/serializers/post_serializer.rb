class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :likes, :liked_by_current_user

  belongs_to :user
  belongs_to :course
  has_many :comments

  def likes
    object.likes.size
  end

  def liked_by_current_user
    object.likes.find_by(user_id: instance_options[:logged_in_as])&.id || false
  end
end
