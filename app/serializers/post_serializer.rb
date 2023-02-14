class PostSerializer < ParentSerializer
  attributes :id, :body, :created_at, :likes, :liked_by_current_user, :image_url, :author_username, :user_id

  belongs_to :course
  has_many :comments, serializer: CommentSerializer

  def likes
    object.likes.size
  end

  def liked_by_current_user
    object.likes.find_by(user_id: instance_options[:logged_in_as])&.id || false
  end
end
