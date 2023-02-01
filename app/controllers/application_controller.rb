class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def unauthorized
    render json: { errors: ['Please log in'] }, status: :unauthorized
  end

  def authorize
    return unauthorized unless session[:user_id] && session[:user_id] == params[:user_id].to_i
  end

  def unprocessable_entity(invalid)
    render json: invalid.record.errors.full_messages, status: :unprocessable_entity
  end

  private

  def not_found
    render json: { errors: ['Not Found'] }, status: :not_found
  end
end
