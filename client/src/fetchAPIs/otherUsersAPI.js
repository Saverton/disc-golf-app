/**
 * Fetch a list of users by optionally passing in a username to match against.
 * @param {string} username 
 * @returns Promise with response data
 */
function fetchOtherUsersByName(username = '') {
  return (
    fetch(`/api/users?username=${username}`)
      .then(res => res.json())
  );
}

/**
 * Fetch another user's detailed profile by passing their id.
 * @param {number} id 
 * @returns Promise with response data
 */
function fetchOtherUserById(id) {
  return (
    fetch(`/api/users/${id}`)
      .then(res => res.json())
  );
}

function fetchCreateFriendship(userId, friendId) {
  return (
    fetch('/api/friendships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friend_id: friendId,
        user_id: userId
      })
    })
      .then(res => res.json())
  );
}

function fetchDeleteFriendship(friendshipId) {
  return (
    fetch(`/api/friendships/${friendshipId}`, {
      method: 'DELETE'
    })
  );
}

const otherUsersAPI = {
  fetchOtherUsersByName,
  fetchOtherUserById,
  fetchCreateFriendship,
  fetchDeleteFriendship
};

export default otherUsersAPI;