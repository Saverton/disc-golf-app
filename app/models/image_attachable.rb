# Module with methods for models that have attached images
module ImageAttachable
  def image_url
    return unless image.attached?

    image.url
  end

  private

  def acceptable_image
    return unless image.attached?

    acceptable_types = ['image/jpeg', 'image/png']
    return if acceptable_types.include?(image.content_type)

    errors.add(:image, 'must be a JPEG or PNG')
  end
end
