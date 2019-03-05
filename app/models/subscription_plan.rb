class SubscriptionPlan < ApplicationRecord
  has_many :customers, through: :subscriptions
end