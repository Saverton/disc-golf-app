class Post < ApplicationRecord
  include ImageAttachable

  belongs_to :user
  belongs_to :course, optional: true
  has_many :comments, dependent: :nullify_then_purge
  has_many :likes, as: :likable, dependent: :nullify_then_purge

  has_one_attached :image

  validates_presence_of :body
  validate :acceptable_image

  def self.feed_posts(user_id, page)
    Post.joins(user: :friendships)
        .where('friendships.friend_id = ? AND friendships.pending = FALSE', user_id)
        .order(created_at: :desc)
        .limit(10)
        .offset(page)
  end

  def image_url
    super || course&.image_url
  end

  def author_username
    return username if username

    puts 'cannot find username, caching'

    self.username = user.username
    save
    username
  end
end
