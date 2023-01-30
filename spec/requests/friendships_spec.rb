require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/friendships", type: :request do
  before :each do
    User.destroy_all
  end

  let(:user1) { User.create(username: 'user1', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'user1@example.com', zip_code: 19368) }
  let(:user2) { User.create(username: 'user2', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'user2@example.com', zip_code: 19368) }
  # This should return the minimal set of attributes required to create a valid
  # Friendship. As you add validations to Friendship, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    {
      user_id: user1.id,
      friend_id: user2.id
    }
  end

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # FriendshipsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "POST /create" do
    context "with valid parameters" do

      it "creates a new Friendship" do
        expect {
          post '/api/friendships',
               params: { friendship: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Friendship, :count).by(1)
      end

      it "renders a JSON response with the new friendship" do
        post '/api/friendships',
             params: { friendship: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

      it 'creates a pending friendship when no friendship containing both users exists' do
        friendship1 = Friendship.create!(user_id: user1.id, friend_id: user2.id)

        expect(friendship1.pending).to be true
      end

      it 'creates a non-pending friendship when both users have created a friendship with one another' do
        friendship1 = Friendship.create!(user_id: user1.id, friend_id: user2.id)
        friendship2 = Friendship.create!(user_id: user2.id, friend_id: user1.id)

        expect(friendship1.pending).to be false
        expect(friendship2.pending).to be false
      end
    end

    context "with invalid parameters" do
      it "does not create a new Friendship" do
        expect {
          post friendships_url,
               params: { friendship: invalid_attributes }, as: :json
        }.to change(Friendship, :count).by(0)
      end

      it "renders a JSON response with errors for the new friendship" do
        post friendships_url,
             params: { friendship: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested friendship" do
      friendship = Friendship.create! valid_attributes
      expect {
        delete friendship_url(friendship), headers: valid_headers, as: :json
      }.to change(Friendship, :count).by(-1)
    end

    it 'returns 204 no content' do
      friendship = Friendship.create! valid_attributes
      delete friendship_url(friendship), headers: valid_headers, as: :json

      expect(response).to have_http_status(:no_content)
    end
  end
end
