class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

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
    render json: @user, include: ['students', 'students.goals', 'students.goals.objectives', 'students.goals.objectives.assessments']
  end

  private
  def user_params
    params.permit(:first_name, :last_name, :job_title, :email, :password, :password_confirmation)
  end
end
