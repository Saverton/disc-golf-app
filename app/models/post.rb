class Post < ApplicationRecord
  belongs_to :user

  def self.feed_posts(user_id)
    Post.joins(user: :friendships).where('friendships.friend_id = ? AND friendships.pending = FALSE', user_id).limit(10)
  end
end
