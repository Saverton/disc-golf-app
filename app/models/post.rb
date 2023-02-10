class Post < ApplicationRecord
  include ImageAttachable

  belongs_to :user
  belongs_to :course, optional: true
  has_many :comments, dependent: :destroy
  has_many :likes, as: :likable, dependent: :destroy

  has_one_attached :image

  validates_presence_of :body
  validate :acceptable_image

  def self.feed_posts(user_id)
    Post.joins(user: :friendships).where('friendships.friend_id = ? AND friendships.pending = FALSE', user_id).limit(10)
  end

  def image_url
    super || course&.image_url
  end
end
