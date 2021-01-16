const init = (callback, opts) => async () => {
  try {
    await gapi.client.init({
      ...opts,
    });

    gapi.auth2.getAuthInstance().isSignedIn.listen(callback);

    callback(gapi.auth2.getAuthInstance().isSignedIn.get());
  } catch (error) {
    throw error;
  }
};

export const signIn = () => gapi.auth2.getAuthInstance().signIn();

export const signOut = () => gapi.auth2.getAuthInstance().signOut();

export const userData = () =>
  gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();

export const onLoad = (
  callback,
  opts = { apiKey: "", clientId: "", discoveryDocs: [], scope: "" }
) => {
  gapi.load("client:auth2", init(callback, opts));
};
