class VerboseCourseSerializer < ParentSerializer
  attributes :id, :name, :address, :num_holes, :description, :posts

  POST_LIMIT = 10

  def posts
    posts = object.posts.order(created_at: :desc).limit(POST_LIMIT)
    serialize_each(posts, PostSerializer)
  end
end
