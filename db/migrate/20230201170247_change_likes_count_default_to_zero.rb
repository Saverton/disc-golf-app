class ChangeLikesCountDefaultToZero < ActiveRecord::Migration[7.0]
  def change
    change_column_default :posts, :likes_count, from: nil, to: 0
  end
end
