class CommentSerializer < ParentSerializer
  attributes :id, :body

  belongs_to :user
end
