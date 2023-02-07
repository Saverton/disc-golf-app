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
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  private

  def acceptable_image
    return unless image.attached?

    acceptable_types = ['image/jpeg', 'image/png']
    return unless acceptable_types.include?(image.content_type)

    errors.add(:image, 'must be a JPEG or PNG')
  end
end
