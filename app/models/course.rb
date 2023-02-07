class Course < ApplicationRecord
  has_many :posts
  has_many :likes, as: :likable

  has_one_attached :image

  validates_presence_of :name, :address
  validates :name, uniqueness: {
    message: 'That course has already been posted! If you are certain that this is a new course, try being more specific in the name.' 
  }
  validates :description, length: { minimum: 10 }
  validates :num_holes, numericality: { greater_than_or_equal_to: 1 }
  validate :acceptable_image

  def image_url
    return unless image.attached?

    image.url
  end

  private

  def acceptable_image
    return unless image.attached?

    pp image.content_type

    acceptable_types = ['image/jpeg', 'image/png']
    return if acceptable_types.include?(image.content_type)

    errors.add(:image, 'must be a JPEG or PNG')
  end
end
