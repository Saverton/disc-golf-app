class Api::LikesController < ApplicationController
  before_action :authorize
  before_action :set_like, only: %i[destroy]

  def create
    @like = Like.create!(like_params)

    render json: @like, status: :created
  end

  def destroy
    @like.destroy
    head :no_content
  end

  private

  def like_params
    params.permit(:user_id, :likable_id, :likable_type)
  end

  def set_like
    @like = Like.find(params[:id])
  end
end
