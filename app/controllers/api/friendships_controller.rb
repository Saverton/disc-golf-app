class Api::FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[destroy]
  before_action :authorize, only: %i[create]
  before_action :authorize_destroy, only: %i[destroy]

  # POST /friendships
  def create
    @friendship = Friendship.new(friendship_params)
    @friendship.update(pending: true)

    if @friendship.save
      check_mutual_friendship
      render json: @friendship.friend, serializer: VerboseUserSerializer, status: :created, logged_in_as: session[:user_id], include: [
        'posts', 'posts.user', 'posts.comments', 'posts.comments.user', 'posts.course'
      ]
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1
  def destroy
    inverse&.destroy
    @friendship.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_friendship
    @friendship = Friendship.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def friendship_params
    params.permit(:user_id, :friend_id)
  end

  # If the inverse friendship exists, set both to pending: false
  def check_mutual_friendship
    inverse_friendship = inverse
    return unless inverse_friendship

    @friendship.update(pending: false)
    inverse_friendship.update(pending: false)
  end

  # return the reverse direction of the friendship, only works if mutual
  def inverse
    Friendship.find_by(user_id: @friendship.friend_id, friend_id: @friendship.user_id)
  end

  def authorize_destroy
    unless session[:user_id] && [@friendship[:user_id], @friendship[:friend_id], params[:user_id]].include?(session[:user_id])
      unauthorized
    end
  end
end
