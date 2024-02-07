import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {LeaderboardMixed} from './pages/LeaderboardMixed.tsx';
import {LeaderboardText} from './pages/LeaderboardText.tsx';
import {LeaderboardImage} from './pages/LeaderboardImage.tsx';
import {GameModes} from './pages/GameModes';
import {MyAccount} from './pages/MyAccount';
import {EditMyAccount} from './pages/EditMyAccount';


import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import {PracticeGame} from './pages/PracticeGame';
import {QuestionType} from './pages/QuestionType';
import {OnlyText} from './pages/OnlyText';
import {OnlyPhotos} from './pages/OnlyPhotos';
import {MixedMode} from './pages/MixedMode';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/gamemode',
      element: <GameModes/>
    },
    {
      path: '/leaderboard/mixed',
      element: <LeaderboardMixed/>
    },
    {
      path: '/leaderboard/text',
      element: <LeaderboardText/>
    },
    {
      path: '/leaderboard/image',
      element: <LeaderboardImage/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/myaccount',
      element: <MyAccount/>
    },
    {
      path: '/editmyaccount',
        element: <EditMyAccount/>
    },
    {
      path: '/practice',
      element: <PracticeGame/>
    },
    {
      path: '/question-type',
      element: <QuestionType/>
    },
    {
      path: '/normal-text',
      element: < OnlyText/>
    },
    {
      path: '/normal-images',
      element: <OnlyPhotos/>
    },
    {
      path: '/normal-mixed',
      element: <MixedMode/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
