class AssessmentsController < ApplicationController
  before_action :find_objective, except: [:destroy]  
  before_action :find_assessment, except: [:create]  

  def create
    assessment = @objective.assessments.create!(assessment_params)
    render json: @objective, status: :created
  end  

  def update
    @assessment.update!(assessment_params)
    render json: @objective, status: :accepted
  end

  def destroy
    @assessment.destroy
    head :no_content
  end

  private
  def assessment_params
    params.permit(:note, :correct, :total)
  end

  def find_assessment
    @assessment = @user.assessments.find(params[:id])
  end

  def find_objective
    @objective = @user.objectives.find(params[:objective_id].to_i)
  end
end
