class Api::UsersController < ApplicationController
  before_action :require_logged_in, only: [:update]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show_current
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
        render :show
    else
      render json: ["This user doesn't exist"], status: 404
    end
  end

  def update
    unless current_user.id == params[:id].to_i
      return render json: { errors: ["You are not authorized to perform this action"] }, status: 403
    end

    @user = current_user
    if @user.update(update_params)
      render :show_current
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def update_params
    permitted = params.require(:user).permit(:username, :email, :location, :about, :password)
    permitted.delete(:password) if permitted[:password].blank?
    permitted
  end
end
