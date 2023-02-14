class Api::PostsController < ApplicationController
  before_action :authorize, only: %i[show create update destroy]
  before_action :set_post, only: %i[show update destroy]
  # GET /posts
  def index
    @posts = if session[:user_id].nil?
               Post.order(created_at: :desc).limit(10).offset(params[:page] || 0)
             else
               Post.feed_posts(session[:user_id], params[:page])
             end

    render json: @posts, status: :ok, include: ['comments', 'comments.user', 'user', 'course'], logged_in_as: session[:user_id]
  end

  # GET /users/:user_id/posts/:id
  def show
    render json: @post, status: :ok, include: ['comments', 'comments.user', 'user', 'course']
  end

  # POST /users/:user_id/posts
  def create
    creation_params = post_create_params
    creation_params.delete(:image) if creation_params[:image] == 'undefined'
    creation_params.delete(:course_id) if creation_params[:course_id] == 'null'
    @post = Post.create!(creation_params)
    @post.username = @post.user.username
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
    permitted = params.permit(:user_id)
    permitted.merge(params.require(:post).permit(:body, :course_id, :image))
  end

  def post_update_params
    params.require(:post).permit(:body)
  end
end
