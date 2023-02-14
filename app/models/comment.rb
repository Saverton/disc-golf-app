class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates_presence_of :body

  def author_username
    return username if username

    self.username = user.username
    save
    username
  end
end
