class ObjectivesController < ApplicationController
  before_action :find_objective, except: [:create]  

  def create
    goal = @user.goals.find(params[:goal_id].to_i)
    objective = goal.objectives.create!(objective_params)
    render json: objective, status: :created
  end  

  def update
    @objective.update!(objective_params)
    render json: @objective, status: :accepted
  end

  def destroy
    @objective.destroy
    head :no_content
  end

  private
  def find_objective
    @objective = @user.objectives.find(params[:id])
  end

  def objective_params
    params.permit(:description)
  end

end
