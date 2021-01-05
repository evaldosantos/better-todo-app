import Head from 'next/head'


export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Todo list</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <h1 className='title'>Stuff I need to do</h1>
      
      <div className='all-tasks'>
        <h2 className="task-list-title">My lists</h2>
        <ul className='task-list'>
          <li className='active-list'>Youtube</li>
          <li>Work</li>
          <li>Grocery</li>
        </ul>

        <form action="">
          <input type="text" className='new-list' name="" id="" placeholder="new list name" aria-label="new list name" />
          <button className="btn btn-list" aria-label="create new list">+</button>
        </form>
      </div>

      <div className='todo-list'>
        <div className="todo-header">
          <h2 className="list-title">Youtube</h2>
          <p className="task-count">3 tasks remianing</p>
        </div>
        <div className="todo-body">
          <div className="tasks">
            <div className="task">
              <input type="checkbox" name="" id="task-1"/>
              <label htmlFor="task-1">
                <span className="custom-checkbox"></span>
                record todo list video</label>
            </div>
            <div className="task">
              <input type="checkbox" name="" id="task-1"/>
              <label htmlFor="task-1">
                <span className="custom-checkbox"></span>
                edit todo list video</label>
            </div>
            <div className="task">
              <input type="checkbox" name="" id="task-1"/>
              <label htmlFor="task-1">
                <span className="custom-checkbox"></span>
                publish todo list video</label>
            </div>
          </div>

          <div className="new-task-creator">
            <form action="">
              <input type="text" name="" id="" className="new-task" placeholder="new task name" aria-label="new task name" />
              <button className="btn btn-task" aria-label="create new task">+</button>
            </form>
          </div>
        </div>


        <div className="delete-stuff">
          <button className="btn delete">Clear completed tasks</button>
          <button className="btn delete">Delete list</button>
        </div>
      </div>

    </div>
  )
}
