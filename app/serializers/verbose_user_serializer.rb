class VerboseUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :zip_code, :friends, :outgoing_friends, :incoming_friends, :friendship

  def friends
    object.friendships.where(pending: false).limit(10).map(&:friend)
  end

  def outgoing_friends
    return nil unless instance_options[:logged_in_as] == object.id

    object.friendships.where(pending: true).limit(10).map(&:friend)
  end

  def incoming_friends
    return nil unless instance_options[:logged_in_as] == object.id

    Friendship.where(friend_id: object.id, pending: true).limit(10).map(&:user)
  end

  def friendship
    friendship = (object.friendships.where(friend_id: instance_options[:logged_in_as])
                        .or(Friendship.where(friend_id: object.id, user_id: instance_options[:logged_in_as])).first)

    if friendship
      status = if !friendship.pending
                 'friends'
               elsif friendship.user_id == object.id
                 'pending-incoming'
               else
                 'pending-outgoing'
               end
      { id: friendship.id, status: status }
    else
      { id: nil, status: false }
    end
  end
end
