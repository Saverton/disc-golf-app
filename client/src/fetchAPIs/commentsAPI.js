function fetchAddComment(userId, commentData) {
  return (
    fetch(`/api/users/${userId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    })
      .then(res => res.json())
  );
}

function fetchEditComment(userId, commentId, commentData) {
  return (
    fetch(`/api/users/${userId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    })
      .then(res => res.json())
  );
}

function fetchDeleteComment(userId, commentId) {
  return (
    fetch(`/api/users/${userId}/comments/${commentId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
  );
}

const commentsAPI = {
  fetchAddComment,
  fetchEditComment,
  fetchDeleteComment
};

export default commentsAPI;