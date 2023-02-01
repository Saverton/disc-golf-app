class User < ApplicationRecord
  has_secure_password

  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :posts
  has_many :comments, dependent: :destroy

  validates_presence_of :username, :password_digest, :first_name, :last_name, :email, :zip_code
  validates :username, uniqueness: true, length: { minimum: 5 }
  validates :password, length: { minimum: 8 }
  validates :email, uniqueness: true, format:
    {
      with: /\A[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.\w{2,}\z/,
      message: 'email must follow standard format, i.e. test@example.com'
    }

  def mutual_friends(limit = 10)
    friendships.where(pending: false).limit(limit).map(&:friend)
  end

  def outgoing_friends(limit = 10)
    friendships.where(pending: true).limit(limit).map(&:friend)
  end

  def incoming_friends(limit = 10)
    Friendship.where(friend_id: id, pending: true).limit(limit).map(&:user)
  end

  def friendship_with(current_user_id)
    friendship =
      friendships.where(friend_id: current_user_id).or(Friendship.where(friend_id: id, user_id: current_user_id)).first
    friendship_status(friendship)
  end

  private

  def friendship_status(friendship)
    if friendship
      status = if !friendship.pending
                 'friends'
               elsif friendship.user_id == id
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
