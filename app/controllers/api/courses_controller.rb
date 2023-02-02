class Api::CoursesController < ApplicationController
  before_action :set_course, only: %i[show]
  before_action :basic_authorize, only: %i[create]

  INDEX_LIMIT = 15

  # GET /courses - returns up to 15 courses, searches by name or returns first 15 depending on presence of
  # params[:name].
  def index
    @courses = if params[:name]
                 Course.where('name LIKE ?', "%#{Course.sanitize_sql_like(params[:name])}%").limit(INDEX_LIMIT)
               else
                 Course.all.limit(INDEX_LIMIT)
               end

    render json: @courses, status: :ok
  end

  # GET /courses/:id - returns a specific course given its id.
  def show
    render json: @course, status: :ok, serializer: VerboseCourseSerializer, include: ['posts', 'posts.user', 'posts.comments', 'posts.comments.user', 'posts.course']
  end

  # POST /courses - creates a new course given the appropriate parameters.
  def create
    @course = Course.create!(course_params)
    render json: @course, status: :created
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.permit(:name, :address, :num_holes, :description)
  end
end
