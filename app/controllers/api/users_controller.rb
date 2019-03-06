class Api::UsersController < ApplicationController
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.save
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :activated_on, :deactivated_on, :customer_id)
  end
end