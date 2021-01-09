import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const OAUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `scope=${process.env.SCOPE}&` +
  `include_granted_scopes=true&` +
  `response_type=token&` +
  `redirect_uri=${process.env.REDIRECT_URI}&` +
  `client_id=${process.env.CLIENT_ID}`;

export default function Home() {
  const router = useRouter();

  const { access_token } = router.query;

  useEffect(() => {
    const url = new URL(window.location.href.replace(/\/#/, "?"));
    const queryParams = new URLSearchParams(url.search);
    const currentToken = queryParams.get("access_token");
    window.localStorage.setItem("app-access-token", currentToken);
    router.push("/");
  }, [access_token]);

  return (
    <div className="container">
      <Head>
        <title>Todo list</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <h1 className="title">Stuff I need to do</h1>

      <a href={OAUTH_URL} target="_blank">
        Login with Google
      </a>

      <div className="all-tasks">
        <h2 className="task-list-title">My lists</h2>
        <ul className="task-list">
          <li className="list-name active-list">Youtube</li>
          <li className="list-name">Work</li>
          <li className="list-name">Grocery</li>
        </ul>

        <form action="">
          <input
            type="text"
            className="new new-list"
            name=""
            id=""
            placeholder="new list name"
            aria-label="new list name"
          />
          <button className="btn create btn-list" aria-label="create new list">
            +
          </button>
        </form>
      </div>

      <div className="todo-list">
        <div className="todo-header">
          <h2 className="list-title">Youtube</h2>
          <p className="task-count">3 tasks remianing</p>
        </div>
        <div className="todo-body">
          <div className="tasks">
            <div className="task">
              <input type="checkbox" name="" id="task-1" />
              <label htmlFor="task-1">
                <span className="custom-checkbox"></span>
                record todo list video
              </label>
            </div>
            <div className="task">
              <input type="checkbox" name="" id="task-2" />
              <label htmlFor="task-2">
                <span className="custom-checkbox"></span>
                edit todo list video
              </label>
            </div>
            <div className="task">
              <input type="checkbox" name="" id="task-3" />
              <label htmlFor="task-3">
                <span className="custom-checkbox"></span>
                publish todo list video
              </label>
            </div>
          </div>

          <div className="new-task-creator">
            <form action="">
              <input
                type="text"
                name=""
                id=""
                className="new new-task"
                placeholder="new task name"
                aria-label="new task name"
              />
              <button
                className="btn create btn-task"
                aria-label="create new task"
              >
                +
              </button>
            </form>
          </div>

          <div className="delete-stuff">
            <button className="btn delete">Clear completed tasks</button>
            <button className="btn delete">Delete list</button>
          </div>
        </div>
      </div>
    </div>
  );
}
