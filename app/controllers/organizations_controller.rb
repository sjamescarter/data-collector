class OrganizationsController < ApplicationController
  def index
    render json: Organization.all
  end

  def create
    organization = Organization.new(organization_params)
    organization.assign_code
    organization.save!
    render json: organization
  end

  def destroy
    organization = Organization.find(params[:id].to_i)
    organization.destroy
    head :no_content
  end

  private
  def organization_params
    params.permit(:name)
  end
end
