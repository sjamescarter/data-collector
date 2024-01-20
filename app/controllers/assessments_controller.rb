class AssessmentsController < ApplicationController
  def create
    # goal = @user.goals.find(params[:goal_id].to_i)
    objective = @user.objectives.find(params[:objective_id].to_i)
    assessment = objective.assessments.create!(assessment_params)
    render json: assessment, status: :created
  end  

  private
  def assessment_params
    params.permit(:note, :correct, :total)
  end
end
