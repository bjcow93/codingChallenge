class CreateSubscriptionPlans < ActiveRecord::Migration[5.2]
  def change
    create_table :subscription_plans do |t|
    t.string :name
    t.integer :monthly_price_in_dollars
      t.timestamps
    end
  end
end
