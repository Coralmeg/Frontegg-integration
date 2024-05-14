import logo from './logo.svg';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import { useEffect } from 'react';
import { FronteggProvider} from '@frontegg/react';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react"; // import FEgg hooks
import { AdminPortal} from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-p36nb7rh3tk3.frontegg.com',
  clientId: 'c75b4399-b37a-4735-9c35-29a3cd1490eb' 
};

const authOptions = {
  // keepSessionAlive: true // Uncomment this in order to maintain the session alive
 };

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <FronteggProvider 
  contextOptions={contextOptions} 
  hostedLoginBox={true}
  authOptions={authOptions}>
      <App />
  </FronteggProvider>,
  document.getElementById('root')
);

const handleClick = () => {
  AdminPortal.show();
};

function App() {
  const { user, isAuthenticated } = useAuth(); // using 'useAuth' hook to access user authentication state
  const loginWithRedirect = useLoginWithRedirect(); //using useLoginWithRedirect hook

  //redirect to login automatically
  useEffect(() => {
  if (!isAuthenticated) {
  loginWithRedirect();
    }
 }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl; //get the base URL of the currect page
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div className="App">
      { isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name}/>
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
          <div>
             <button onClick={handleClick}>Settings</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}
export default App;

