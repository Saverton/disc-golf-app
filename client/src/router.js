import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './features/user/Login';
import Signup from './features/user/Signup';
import UserSearch from './features/otherUsers/UserSearch';
import Profile from './features/otherUsers/Profile';
import Feed from './features/posts/Feed';
import NewPost from './features/posts/NewPost';
import EditPost from './features/posts/EditPost';
import Courses from './features/courses/Courses';
import CourseDetail from './features/courses/CourseDetail';
import NewCourse from './features/courses/NewCourse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login/',
        element: <Login />
      },
      {
        path: 'signup/',
        element: <Signup />
      },
      {
        path: 'users/',
        element: <UserSearch />
      },
      {
        path: 'users/:id',
        element: <Profile />
      },
      {
        path: 'feed/',
        element: <Feed />
      },
      {
        path: 'new_post',
        element: <NewPost />
      },
      {
        path: 'edit_post/:post_id',
        element: <EditPost />
      },
      {
        path: 'courses',
        element: <Courses />
      },
      {
        path: 'courses/:id',
        element: <CourseDetail />
      },
      {
        path: 'new_course',
        element: <NewCourse />
      }
    ]
  }
]);

export default router;