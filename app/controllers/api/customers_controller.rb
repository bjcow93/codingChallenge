class Api::CustomersController < ApplicationController
  def billing 
    month = Date.parse(params[:month] += "-01")
    end_of_month = month.end_of_month
    customer = Customer.find(params[:id])
    subscription = customer.subscriptions.where("started_on <= :month AND (ended_on >= :month OR ended_on IS NULL)", {month: month})
    users = customer.users.where("activated_on IN (:time_period) OR deactivated_on IN (:time_period) OR (activated_on < :start_of_month AND deactivated_on IS NULL)", {start_of_month: month, time_period: (month..end_of_month).to_a})

    render json: {
        customer: customer,
        subscription: subscription,
        users: users,
      }
  end
  
  private
    def customer_params
      params.require(:customer).permit(:subscriptions, :users)
    end
 end

#  past_plan = customer.subscriptions.create!({subscription_plan: startup_plan, started_on: '2018-01-01'})
#  startup_plan = customer.subscriptions.create! subscription_plan: startup_plan, started_on: '2018-01-01', ended_on: '2019-01-31'
#  growth_plan = customer.subscriptions.create! subscription_plan: startup_plan, started_on: '2019-01-01', ended_on: '2019-02-28'
#  customer.users.create! name: 'User', activated_on: '2018-05-05'
#  customer.users.create! name: 'User', activated_on: '2018-01-01', deactivated_on: '2019-01-31'
#  customer.users.create! name: 'User', activated_on: '2019-01-01', deactivated_on: '2019-02-28'