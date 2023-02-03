class UserSerializer < ParentSerializer
  attributes :id, :username, :full_name

  def full_name
    "#{object.first_name.capitalize} #{object.last_name.capitalize}"
  end
end
