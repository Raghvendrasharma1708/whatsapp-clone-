
import './App.css';
import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './components/context/AccountProvider';




function App() {


  const client_id = process.env.CLIENT_ID || "1062781602217-kkc4i7uccaskuclp0hlm1bkbf0n4fs7s.apps.googleusercontent.com"

  console.log(client_id)


  return (
    <>


    
        <GoogleOAuthProvider clientId={client_id}>
          <AccountProvider>
            <Messenger client_id={client_id} />
          </AccountProvider>
        </GoogleOAuthProvider>
     

    </>
  );
}

export default App;
