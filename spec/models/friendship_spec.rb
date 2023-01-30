require 'rails_helper'

RSpec.describe Friendship, type: :model do
  describe 'validations' do
    before do
      User.destroy_all
      let(:user1) { User.create(username: 'user1', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'user1@example.com', zip_code: 19368) }
      let(:user2) { User.create(username: 'user2', password: 'test_pwd', first_name: 'john', last_name: 'doe', email: 'user2@example.com', zip_code: 19368) }
    end

    it 'cannot create duplicate friendships' do
      friendship1 = Friendship.create(user_id: user1.id, friend_id: user2.id)
      friendship2 = Friendship.create(user_id: user1.id, friend_id: user2.id)
      friendship3 = Friendship.create(user_id: user2.id, friend_id: user1.id)

      expect(friendship1).to be_valid
      expect(friendship2).to be_invalid
      expect(friendship3).to be_valid
    end
  end
end
