class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :num_holes, :description
end
