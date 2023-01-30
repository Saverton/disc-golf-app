require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'validations' do

    before :each do
      User.destroy_all
    end

    context 'username' do

      it 'must exist' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_invalid
      end

      it 'must be at least 5 characters long' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test2@example.com', zip_code: 19368)
        ).to be_invalid
      end

      it 'must be unique' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test2@example.com', zip_code: 19368)
        ).to be_invalid
      end
    end

    context 'password' do
      it 'must exist' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username', first_name: 'john', last_name: 'doe', email: 'test2@example.com', zip_code: 19368)
        ).to be_invalid
      end

      it 'must be at least 8 characters long' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'pwd', first_name: 'john', last_name: 'doe', email: 'test2@example.com', zip_code: 19368)
        ).to be_invalid
      end
    end

    context 'first_name' do
      it 'must exist' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'test_pwd', last_name: 'doe', email: 'test2@example.com', zip_code: 19368)
        ).to be_invalid
      end
    end

    context 'first_name' do
      it 'must exist' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'test_pwd', first_name: 'john', email: 'test2@example.com', zip_code: 19368)
        ).to be_invalid
      end
    end

    context 'email' do
      it 'must exist' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'test_pwd', first_name: 'john', last_name: 'doe', zip_code: 19368)
        ).to be_invalid
      end

      it 'must be unique' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_invalid
      end

      it 'must follow the format test@example.com' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example', zip_code: 19368)
        ).to be_invalid
        expect(
          User.create(username: 'test_username_3', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'testexample.com', zip_code: 19368)
        ).to be_invalid
      end
    end

    context 'zip_code' do
      it 'must exist' do
        expect(
          User.create(username: 'test_username', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test@example.com', zip_code: 19368)
        ).to be_valid
        expect(
          User.create(username: 'test_username_2', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'test2@example.com')
        ).to be_invalid
      end
    end
  end

  describe 'relationships' do

    let(:user1) { User.create(username: 'user1', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'user1@example.com', zip_code: 19368) }
    let(:user2) { User.create(username: 'user2', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'user2@example.com', zip_code: 19368) }

    it 'can access the associated friendships' do
      friendship = Friendship.create(user_id: user1.id, friend_id: user2.id)

      expect(user1.friendships).to include(friendship)
    end

    it 'can access associated friend users' do
      Friendship.create(user_id: user1.id, friend_id: user2.id)

      expect(user1.friends).to include(user2)
    end
  end
end
