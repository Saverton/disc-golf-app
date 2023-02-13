import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

export default function Likes({ likable, type }) {
  const { id } = likable;
  const [{ likes, liked }, setLikeData] = useState({
    likes: likable.likes,
    liked: likable.liked_by_current_user
  });
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    setLikeData({
      likes: likable.likes,
      liked: likable.liked_by_current_user
    })
  }, [likable]);

  const handleLike = () => {
    fetch(`/api/users/${currentUser.id}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        likable_type: type,
        likable_id: id
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(like => setLikeData(data => ({likes: data.likes + 1, liked: like.id})));
        } else {
          res.json().then(console.log);
        }
      });
  }

  const handleUnlike = () => {
    fetch(`/api/users/${currentUser.id}/likes/${liked}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setLikeData(data => ({likes: data.likes - 1, liked: false}));
        } else {
          res.json().then(console.log);
        }
      });
  }

  return (
    <Button icon onClick={liked ? handleUnlike : handleLike}>
      {
        liked
        ? <Icon name="like" color="red" />
        : <Icon name="like" />
      }
      {' '}{likes} like
      {likes !== 1 && 's'}
    </Button>
  );
}