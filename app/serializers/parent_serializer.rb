class ParentSerializer < ActiveModel::Serializer
  private

  def serialize_each(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end
end