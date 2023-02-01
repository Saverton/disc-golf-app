class Api::PostsController < ApplicationController
  before_action :authorize, only: %i[show create update destroy]
  before_action :set_post, only: %i[show update destroy]
  # GET /posts
  def index
    return render json: Post.limit(10), status: :ok unless session[:user_id]

    @posts = Post.feed_posts(session[:user_id])

    render json: @posts, status: :ok
  end

  # GET /users/:user_id/posts/:id
  def show
    render json: @post, status: :ok
  end

  # POST /users/:user_id/posts
  def create
    @post = Post.create!(post_create_params)
    render json: @post, status: :created
  end

  # PATCH /users/:user_id/posts/:id
  def update
    @post.update(post_update_params)
    render json: @post, status: :accepted
  end

  # DELETE /users/:user_id/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_create_params
    params.permit(:user_id, :body)
  end

  def post_update_params
    params.permit(:body)
  end
end
