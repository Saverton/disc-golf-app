class Api::PostsController < ApplicationController
  # GET /posts
  def index
    return unauthorized unless session[:user_id]

    @posts = Post.feed_posts(session[:user_id])

    render json: @posts, status: :ok
  end

  # POST /users/:user_id/posts
  def create
    return unauthorized unless authorize

    @post = Post.create(user_id: params[:user_id])
    render json: @post, status: :created
  end

  private

  def post_params
    params.permit(:user_id, :body)
  end
end
