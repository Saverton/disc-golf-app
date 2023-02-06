class UserSerializer < ParentSerializer
  attributes :id, :username, :full_name

  def full_name
    object.full_name
  end
end
