import React from 'react';
import Likes from '../../components/Likes';
import { Card, Image } from 'semantic-ui-react';

export default function CourseCard({ course }) {
  const { name, address, num_holes, description, image_url } = course;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{`${num_holes} Holes`}</Card.Meta>
        <Card.Meta>{address}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Meta>
          <Likes likable={course} type="Course" />
        </Card.Meta>
      </Card.Content>
      {
        image_url ?
        <Card.Content>
          <Image src={image_url} alt="course image" />
        </Card.Content>
        : null
      }
    </Card>
  );
}