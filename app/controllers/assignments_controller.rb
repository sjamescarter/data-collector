class AssignmentsController < ApplicationController
  def create
    goal = @user.goals.find(params[:goal_id].to_i)
    assignment = goal.assignments.create!(data_params)
    render json: goal, status: :created
  end  

  private
  def data_params
    params.permit(:note, :correct, :total)
  end
end
