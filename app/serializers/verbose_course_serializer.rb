class VerboseCourseSerializer < ParentSerializer
  attributes :id, :name, :address, :num_holes, :description, :posts, :likes, :liked_by_current_user

  POST_LIMIT = 10

  def posts
    posts = object.posts.order(created_at: :desc).limit(POST_LIMIT)
    serialize_each(posts, PostSerializer)
  end

  def likes
    object.likes.size
  end

  def liked_by_current_user
    object.likes.find_by(user_id: instance_options[:logged_in_as])&.id || false
  end
end
