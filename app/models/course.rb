class Course < ApplicationRecord
  has_many :posts

  validates_presence_of :name, :address
  validates :name, uniqueness: {
    message: 'That course has already been posted! If you are certain that this is a new course, try being more specific in the name.' 
  }
  validates :description, length: { minimum: 10 }
  validates :num_holes, numericality: { greater_than_or_equal_to: 1 }
end
