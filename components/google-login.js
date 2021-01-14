import { useEffect, useState } from "react";
import { useScript } from "../hooks/useScript";

const OAUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `scope=${process.env.NEXT_PUBLIC_SCOPE}&` +
  `include_granted_scopes=true&` +
  `response_type=token&` +
  `redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&` +
  `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`;

export function GoogleLogin({
  buttonText = "Login with Google",
  onSuccess = (i) => i,
  onFailure = (i) => i,
  render,
}) {
  const scriptStatus = useScript("https://apis.google.com/js/api.js");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function initClient() {
    try {
      await gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        discoveryDocs: [process.env.NEXT_PUBLIC_DISCOVERY_DOCS],
        scope: process.env.NEXT_PUBLIC_SCOPES,
      });
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (error) {
      console.log(error);
    }
  }

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      onSuccess(
        gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      );
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleSignIn(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignOut(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  useEffect(() => {
    if (scriptStatus !== "ready") return;
    gapi.load("client:auth2", initClient);
  }, [scriptStatus]);

  if (render) {
    return render({
      handleSignIn,
      handleSignOut,
    });
  } else {
    return (
      <button onClick={isLoggedIn ? handleSignOut : handleSignIn}>
        {buttonText}
      </button>
    );
  }
}
