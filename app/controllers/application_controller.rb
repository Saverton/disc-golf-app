class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def unauthorized
    render json: { errors: ['Please log in'] }, status: :unauthorized
  end

  # Checks if a user is logged in and if the logged in user matches the user specified in the params hash.
  def authorize
    return unauthorized unless session[:user_id] && session[:user_id] == params[:user_id].to_i
  end

  # Checks if a user is logged in.
  def basic_authorize
    return unauthorized unless session[:user_id]
  end

  def unprocessable_entity(invalid)
    render json: invalid.record.errors, status: :unprocessable_entity
  end

  private

  def not_found
    render json: { errors: ['Not Found'] }, status: :not_found
  end
end
