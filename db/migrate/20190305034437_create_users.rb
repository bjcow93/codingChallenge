class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.date :activated_on, null: false
      t.date :deactivated_on
      t.integer :customer_id
      t.timestamps
    end
    add_index :users, :customer_id
  end
end
