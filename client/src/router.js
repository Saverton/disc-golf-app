import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './features/user/Login';
import Signup from './features/user/Signup';
import UserSearch from './components/UserSearch';
import Profile from './features/user/Profile';
import Feed from './components/Feed';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Courses from './components/Courses';

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
      }
    ]
  }
]);

export default router;