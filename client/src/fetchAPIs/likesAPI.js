/**
 * Add a like to a likable object on the database.
 * @param {number} userId 
 * @param {Object} likable 
 * @returns Promise with like data returned
 */
function addLike(userId, likable) {
  return (
    fetch(`/api/users/${userId}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        likable_type: likable.type,
        likable_id: likable.id
      })
    })
      .then(res => res.json())
  );
}

/**
 * Removes a like from the database.
 * @param {number} userId
 * @param {number} likeId 
 * @returns 
 */
function removeLike(userId, likeId) {
  return (
    fetch(`/api/users/${userId}/likes/${likeId}`, {
      method: 'DELETE'
    })
  );
}

export const likesAPI = {
  addLike,
  removeLike
}