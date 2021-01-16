import { useEffect, useState } from "react";
import { useScript } from "../hooks/useScript";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as GoogleAuth from "../lib/google";

/* 
  <GoogleLogin
    render={({ handleSignIn, userData, handleSignOut }) =>
      userData ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <button onClick={handleSignIn}>Login</button>
      )
    }
  /> 
*/

export function GoogleLogin({
  buttonText = "Login with Google",
  onLoginFailure = (i) => i,
  loginHandler = (i) => i,
  logoutHandler = (i) => i,
  storageKey = "bta-user-data",
  render,
}) {
  const scriptStatus = useScript("https://apis.google.com/js/api.js");
  const [userData, setUserData] = useLocalStorage(storageKey, {});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateSigninStatus = (isSignedIn) => {
    try {
      if (isSignedIn) {
        setUserData(GoogleAuth.userData());
      } else {
        setUserData(null);
        onLoginFailure();
      }
    } catch (e) {
      console.log(e);
      onLoginFailure(e);
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  function handleSignIn(event) {
    GoogleAuth.signIn();
    loginHandler();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignOut(event) {
    GoogleAuth.signOut();
    logoutHandler;
  }

  useEffect(() => {
    if (scriptStatus !== "ready") return;

    GoogleAuth.onLoad(updateSigninStatus, {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      discoveryDocs: [process.env.NEXT_PUBLIC_DISCOVERY_DOCS],
      scope: process.env.NEXT_PUBLIC_SCOPES,
    });
  }, [scriptStatus]);

  if (render) {
    return render({
      handleSignIn,
      handleSignOut,
      userData,
    });
  } else {
    return (
      <button onClick={isLoggedIn ? handleSignOut : handleSignIn}>
        {buttonText}
      </button>
    );
  }
}
