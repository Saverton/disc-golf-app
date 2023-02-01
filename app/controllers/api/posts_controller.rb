class Api::PostsController < ApplicationController
  before_action :authorize, only: %i[create]
  # GET /posts
  def index
    return unauthorized unless session[:user_id]

    @posts = Post.feed_posts(session[:user_id])

    render json: @posts, status: :ok
  end

  # POST /users/:user_id/posts
  def create
    @post = Post.create!(post_params)
    render json: @post, status: :created
  end

  private

  def post_params
    params.permit(:user_id, :body)
  end
end
