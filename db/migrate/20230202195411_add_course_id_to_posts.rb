class AddCourseIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :course_id, :bigint, null: true 
    add_foreign_key :posts, :courses
    add_index :posts, :course_id
  end
end
