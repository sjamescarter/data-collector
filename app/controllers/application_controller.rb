class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::Serialization

  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_response

  private
  def authorize
    if session[:user_id]
      @user = User.find(session[:user_id])
    else
      render json: { errors: ["Please Sign In"] }, status: :unauthorized
    end
  end

  def invalid_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
