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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...postData,
        course_id: postData.course.id
      })
    })
      .then(res => res.json())
  );
}

function fetchEditPost(userId, postId, postData) {
  return (
    fetch(`/api/users/${userId}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
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