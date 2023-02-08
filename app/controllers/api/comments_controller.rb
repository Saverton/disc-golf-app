class Api::CommentsController < ApplicationController
  before_action :set_comment, only: %i[update destroy]
  before_action :authorize, only: %i[create update destroy]

  def create
    @comment = Comment.create!(comment_create_params)
    render json: @comment, status: :created
  end

  def update
    @comment.update(comment_update_params)
    render json: @comment, status: :accepted
  end

  def destroy
    @comment.destroy
    render json: @comment, status: :accepted
  end

  private

  def comment_create_params
    params.permit(:user_id, :post_id, :body)
  end

  def comment_update_params
    params.permit(:body)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
