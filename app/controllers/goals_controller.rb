class GoalsController < ApplicationController
  before_action :find_goal, except: [:index, :create]  
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    render json: @user.goals
  end

  def create
    student = Student.find(params[:student_id].to_i)
    goal = @user.goals.build(goal_params)
    student.goals << goal
    goal.save!
    render json: goal, status: :created
  end

  def update
    @goal.update!(goal_params)
    render json: @goal, status: :accepted
  end

  def destroy
    @goal.destroy
    head :no_content
  end

  private
  def goal_params
    params.permit(:condition, :behavior, :accuracy, :measurement)
  end

  def find_goal
    @goal = @user.goals.find(params[:id])
  end

  def not_found_response
    render json: { errors: ["Please select a student"]}, status: :not_found
  end
end
