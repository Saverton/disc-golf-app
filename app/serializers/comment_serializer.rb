class CommentSerializer < ParentSerializer
  attributes :id, :body, :post_id, :author_username, :user_id
end
