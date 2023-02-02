class AddLikesCountToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :likes_count, :integer, default: 0
  end
end
