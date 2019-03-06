# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#


 customer = Customer.create! name: 'Test customer'
 employee1 = customer.users.create! name: 'Employee #1', activated_on: Date.parse('2018-11-04'), deactivated_on: nil
 employee2 = customer.users.create! name: 'Employee #2', activated_on: Date.parse('2018-12-04'), deactivated_on: nil
 employee3 = customer.users.create! name: 'Employee #3', activated_on: Date.parse('2019-01-10'), deactivated_on: nil
 newPlan = SubscriptionPlan.create! name: 'newPlan', monthly_price_in_dollars: 4
 subscription = Subscription.create! customer_id: 1, subscription_plan_id: 1, started_on: Date.parse('2019-01-21'), ended_on: nil


# Challenge 2 seeds:
#  customer = Customer.create! name: 'Test customer'
#  past_plan = customer.subscriptions.create! subscription_plan: startup_plan, started_on: '2018-01-01'
#  startup_plan = customer.subscriptions.create! subscription_plan: startup_plan, started_on: '2018-01-01', ended_on: '2019-01-31'
#  growth_plan = customer.subscriptions.create! subscription_plan: startup_plan, started_on: '2019-01-01', ended_on: '2019-02-28'
#  customer.users.create! name: 'User', activated_on: '2018-05-05'
#  customer.users.create! name: 'User', activated_on: '2018-01-01', deactivated_on: '2019-01-31'
#  customer.users.create! name: 'User', activated_on: '2019-01-01', deactivated_on: '2019-02-28'


# Challenge 3 seeds:
# 
# const userSignedUp = [
#   {
#     id: 1,
#     name: 'Employee #1',
#     activatedOn: new Date('2018-11-04'),
#     deactivatedOn: null,
#     customerId: 1,
#   },
#   {
#     id: 2,
#     name: 'Employee #2',
#     activatedOn: new Date('2018-12-04'),
#     deactivatedOn: null,
#     customerId: 1,
#   },
#   {
#     id: 3,
#     name: 'Employee #3',
#     activatedOn: new Date('2019-01-10'),
#     deactivatedOn: null,
#     customerId: 1,
#   },
# ];

# const constantUsers = [
#   {
#     id: 1,
#     name: 'Employee #1',
#     activatedOn: new Date('2018-11-04'),
#     deactivatedOn: null,
#     customerId: 1,
#   },
#   {
#     id: 2,
#     name: 'Employee #2',
#     activatedOn: new Date('2018-12-04'),
#     deactivatedOn: null,
#     customerId: 1,
#   },
# ];

# const newPlan = {
#   id: 1,
#   customerId: 1,
#   startedOn: new Date('2019-01-21'),
#   endedOn: null,
#   monthlyPriceInDollars: 4,
# };