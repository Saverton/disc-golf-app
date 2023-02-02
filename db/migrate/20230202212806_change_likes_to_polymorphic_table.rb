class ChangeLikesToPolymorphicTable < ActiveRecord::Migration[7.0]
  def change
    change_table :likes do |t|
      t.remove :post_id
      t.string :likable_type
      t.bigint :likable_id
    end
  end
end
