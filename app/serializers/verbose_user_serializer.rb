class VerboseUserSerializer < ParentSerializer
  attributes :id, :username, :first_name, :last_name, :email, :zip_code, :friends, :outgoing_friends, :incoming_friends, :friendship, :full_name

  has_many :posts

  attribute :friends do
    serialize_each(object.mutual_friends, UserSerializer)
  end

  def outgoing_friends
    return nil unless authorize_current

    serialize_each(object.outgoing_friends, UserSerializer)
  end

  def incoming_friends
    return nil unless authorize_current

    serialize_each(object.incoming_friends, UserSerializer)
  end

  def friendship
    object.friendship_with(instance_options[:logged_in_as])
  end

  private

  def authorize_current
    instance_options[:logged_in_as] == object.id
  end
end
