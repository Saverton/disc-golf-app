import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentsSection from './CommentsSection';
import Likes from '../../components/Likes';
import NewComment from './NewComment';
import { Grid, Icon, Image, Header, Button, Divider } from 'semantic-ui-react';

export default function Post({ post }) {
  const { id, body, user_id: userId, author_username: username, course, image_url: img, comments } = post;
  const currentUser = useSelector(state => state.user);
  const [writing, setWriting] = useState();

  return (
    <Grid>
      {/* Post Header */}
      <Grid.Row>
        <Grid.Column>
          <Header as="h3" block>
            <Icon name="user" />
            <Header.Content>
              <Link to={`/users/${userId}`}>
                {username}
              </Link>

              { course && 
                <span> at{' '}
                  <Link to={`/courses/${course.id}`}>
                    {course.name}
                  </Link>
                </span>
              }
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>

      {/* Post Content */}
      <Grid.Row>
        <Grid.Column>
          {img && 
            <>
              <Image src={img} alt="Post's Image" fluid rounded/>
              <Divider hidden />
            </>
          }

          <p style={{fontSize: '1.5rem'}}>
            {body}
          </p>
        </Grid.Column>
      </Grid.Row>

      {/* Post Meta Info */}
      <Grid.Row centered>
        <Grid.Column width={15}>
          <Button.Group fluid color="blue" basic>
            <Likes likable={post} type="Post" />

            <Button
              icon={{name: "comment"}}
              content="Comment"
              onClick={() => setWriting(w => !w)}
            />

            { currentUser.id === userId && 
              <Button
                icon={{name: "edit"}}
                content="Edit"
                as={Link}
                to={`/edit_post/${id}`}
              />
            }
          </Button.Group>
        </Grid.Column>
      </Grid.Row>

      {/* Comments */}
      <Grid.Row centered>
        <Grid.Column width={15}>
          {writing && <NewComment postId={id} onCancel={() => setWriting(false)} />}

          <CommentsSection comments={comments} postId={id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}