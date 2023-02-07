class VerboseCourseSerializer < ParentSerializer
  attributes :id, :name, :address, :num_holes, :description, :likes, :liked_by_current_user, :image_url

  POST_LIMIT = 10

  has_many :posts do
    object.posts.order(created_at: :desc).limit(POST_LIMIT)
  end

  def likes
    object.likes.size
  end

  def liked_by_current_user
    object.likes.find_by(user_id: instance_options[:logged_in_as])&.id || false
  end
end
