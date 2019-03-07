class Api::CustomersController < ApplicationController
  def billing
    start_of_month = params[:month] + "-01"
    end_of_month = Date.parse(start_of_month).end_of_month.to_s
    time_period = (start_of_month..end_of_month).to_a

    customer = Customer.find(params[:id])
    subscription = customer.subscriptions.find_by("(started_on <= :start_of_month AND (ended_on >= :start_of_month OR ended_on IS NULL)) OR (started_on IN (:time_period))", {start_of_month: start_of_month, time_period: time_period})
    users = customer.users.where("activated_on IN (:time_period) OR deactivated_on IN (:time_period) OR (activated_on < :start_of_month AND deactivated_on IS NULL)", {start_of_month: start_of_month, time_period: time_period})
    subscription_plan = subscription ? SubscriptionPlan.find(subscription.subscription_plan_id) : {}

    render json: {
        customer: customer,
        subscription: subscription,
        users: users,
        sub_plan: subscription_plan,
        month: params[:month],
      }
  end

  
  private
    def customer_params
      params.require(:customer).permit(:subscriptions, :users)
    end
 end