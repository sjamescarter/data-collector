class GoalsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    render json: @user.goals
  end

  def create
    student = Student.find(params[:student_id].to_i)
    goal = @user.goals.create(goal_params)
    student.goals << goal
    if goal.valid?
      render json: goal, status: :created
    else
      render json: { errors: goal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    goal = find_goal
    goal.update(goal_params)
    if goal.valid?
      render json: goal, status: :accepted
    else
      render json: { errors: goal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    goal = find_goal
    goal.destroy
    head :no_content
  end

  private
  def goal_params
    params.permit(:condition, :behavior, :accuracy, :measurement)
  end

  def find_goal
    @user.goals.find(params[:id])
  end

  def not_found_response
    render json: { errors: ["Please select a student"]}, status: :not_found
  end
end
