class GoalsController < ApplicationController

  def create
    student = Student.find(params[:student_id])
    goal = Goal.create(goal_params)
    @user.goals << goal
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
    params.permit(:condition, :behavior, :accuracy, :measurement, :trials_correct, :trials_total)
  end

  def find_goal
    @user.goals.find(params[:id])
  end
end
