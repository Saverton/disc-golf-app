class UserSerializer < ParentSerializer
  attributes :id, :username, :full_name, :notifications?

  def full_name
    object.full_name
  end
end
