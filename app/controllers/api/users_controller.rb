class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show]

  INDEX_LIMIT = 25

  # GET /users
  def index
    @users = if params[:username]
               User.where('username LIKE ?', "%#{User.sanitize_sql_like(params[:username])}%").limit(INDEX_LIMIT)
             else
               User.all.limit(INDEX_LIMIT)
             end
    render json: @users, status: :ok
  end

  # GET /users/1
  def show
    render json: @user, serializer: VerboseUserSerializer, status: :ok, logged_in_as: session[:user_id]
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    render json: @user, status: :created
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:username, :password, :password_confirmation, :first_name, :last_name, :email, :zip_code)
  end

  def not_found
    render json: { errors: ['User not found'] }, status: :not_found
  end
end
