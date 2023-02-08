class CommentSerializer < ParentSerializer
  attributes :id, :body, :post_id

  belongs_to :user
end
