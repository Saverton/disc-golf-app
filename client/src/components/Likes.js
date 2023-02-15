import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavigateContext } from '../context/NavigateContext';
import { Button, Icon } from 'semantic-ui-react';
import { likesAPI } from '../fetchAPIs/likesAPI';

export default function Likes({ likable, type }) {
  const { id } = likable;
  const [{ likes, liked }, setLikeData] = useState({
    likes: likable.likes,
    liked: likable.liked_by_current_user
  });
  const currentUser = useSelector(state => state.user);
  const navigate = useContext(NavigateContext);

  useEffect(() => {
    setLikeData({
      likes: likable.likes,
      liked: likable.liked_by_current_user
    })
  }, [likable]);

  /**
   * Add a new like to the database, then update the DOM accordingly.
   */
  const handleLike = () => {
    if (!currentUser.id) return navigate('/login');

    likesAPI.addLike(
      currentUser.id,
      { id, type }
    ).then(likeData => {
      setLikeData(data => ({ likes: data.likes + 1, liked: likeData.id}));
    });
  }

  /**
   * Remove the like on the database, then update the DOM accordingly.
   */
  const handleUnlike = () => {
    likesAPI.removeLike(
      currentUser.id,
      liked
    ).then(
      _ => setLikeData(data => ({ likes: data.likes - 1, liked: false }))
    );
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