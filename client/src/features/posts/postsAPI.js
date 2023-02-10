function fetchPosts() {
  return (
    fetch('/api/posts')
      .then(res => res.json())
  );
}

function fetchPostById(userId, postId) {
  return (
    fetch(`/api/users/${userId}/posts/${postId}`)
      .then(res => res.json())
  );
}

function fetchCreatePost(userId, postData) {
  return (
    fetch(`/api/users/${userId}/posts`, {
      method: 'POST',
      body: postData
    })
      .then(res => res.json())
  );
}

function fetchEditPost(userId, postId, postData) {
  return (
    fetch(`/api/users/${userId}/posts/${postId}`, {
      method: 'PATCH',
      body: postData
    })
      .then(res => res.json())
  );
}

function fetchDeletePost(userId, postId) {
  return (
    fetch(`/api/users/${userId}/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(res => res.ok ? {} : res.json())
  );
}

const postsAPI = {
  fetchPosts,
  fetchPostById,
  fetchCreatePost,
  fetchEditPost,
  fetchDeletePost
}

export default postsAPI;