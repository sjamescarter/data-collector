class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::Serialization

  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session }
  end

end
