class Course < ApplicationRecord
  include ImageAttachable

  has_many :posts
  has_many :likes, as: :likable, dependent: :nullify_then_purge

  has_one_attached :image

  validates_presence_of :name, :address
  validates :name, uniqueness: {
    message: 'That course has already been posted! If you are certain that this is a new course, try being more specific in the name.' 
  }
  validates :description, length: { minimum: 10 }
  validates :num_holes, numericality: { greater_than_or_equal_to: 1 }
  validate :acceptable_image
end
