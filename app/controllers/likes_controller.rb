class LikesController < ApplicationController
  before_action :authorize
  before_action :set_like, only: %i[destroy]

  def create
    @like = Like.create!(like_params)
    render json: @like.post, status: :created, serializer: PostSerializer
  end

  def destroy
    @like.destroy
    head :no_content
  end

  private

  def like_params
    params.permit(:user_id, :post_id)
  end

  def set_like
    @like = Like.find(params[:id])
  end
end
