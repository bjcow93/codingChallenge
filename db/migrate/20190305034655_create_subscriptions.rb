class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
    t.integer :customer_id
    t.integer :subscription_plan_id
    t.date :started_on, null: false
    t.date :ended_on
      t.timestamps
    end
    add_index :subscriptions, :customer_id 
    add_index :subscriptions, :subscription_plan_id
  end
end
