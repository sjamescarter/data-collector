class UsersController < ApplicationController
  skip_before_action :find_user

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if session[:user_id]
      render json: User.find(session[:user_id]), include: ['students', 'students.goals']
    else
      render json: { error: "Please Sign In"}, status: :unauthorized
    end
  end

  private
  def user_params
    params.permit(:first_name, :last_name, :job_title, :email, :password, :password_confirmation)
  end
end
