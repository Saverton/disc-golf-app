class Api::CoursesController < ApplicationController
  before_action :set_course, only: %i[show]
  before_action :basic_authorize, only: %i[create]

  INDEX_LIMIT = 15

  # GET /courses - returns up to 15 courses, searches by name or returns first 15 depending on presence of
  # params[:name].
  def index
    @courses = if params[:name]
                 Course.where('lower(name) LIKE ?', "%#{Course.sanitize_sql_like(params[:name])}%".downcase).order(likes_count: :desc).limit(INDEX_LIMIT)
               else
                 Course.order(likes_count: :desc).limit(INDEX_LIMIT)
               end

    render json: @courses, status: :ok
  end

  # GET /courses/:id - returns a specific course given its id.
  def show
    render json: @course, status: :ok,
           serializer: VerboseCourseSerializer,
           include: ['posts', 'posts.user', 'posts.comments', 'posts.comments.user', 'posts.course'],
           logged_in_as: session[:user_id]
  end

  # POST /courses - creates a new course given the appropriate parameters.
  def create
    creation_params = course_params
    creation_params.delete(:image) if creation_params[:image] == 'undefined'
    @course = Course.create!(creation_params)
    render json: @course, status: :created
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:name, :address, :num_holes, :description, :image)
  end
end
