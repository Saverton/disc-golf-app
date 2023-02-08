class Api::SessionsController < ApplicationController
  def show
    return unauthorized unless session[:user_id]

    render json: User.find(session[:user_id]), serializer: CurrentUserSerializer, status: :ok
  end

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, serializer: CurrentUserSerializer, status: :created
    else
      render json: { errors: ['invalid username or password'], status: :unauthorized }, status: :unauthorized
    end
  end

  def destroy
    return unauthorized unless session[:user_id]

    session.delete :user_id
    head :no_content
  end

  private

  def not_found
    render json: { errors: ['User not found'] }, status: :not_found
  end
end
