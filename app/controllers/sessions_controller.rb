class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, exclude: [:password]
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id]
      session.delete :user_id
      head :no_content
    else
      render json: { errors: ["Please Sign In"] }, status: :unauthorized
    end
  end
end
