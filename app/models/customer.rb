class Customer < ApplicationRecord
  has_many :subscriptions
  has_many :subscription_plans, through: :subscriptions
  has_many :users
end