const list = [
  {
    title: 'React',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

function App() {
  // you can do something in between

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      <List />
    </div>
  );
}

function List() {
  return (
    <ul>
      {list.map(item => (
        <Item key={item.objectID} {...item} />
      ))}
    </ul>
  );
}

function Item(item) {
  const { objectID, url, title, author, num_comments, points } = item;
  return (
    <li key={objectID}>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
}

function Search() {
  return (
    <div>
      <label htmlFor="search">Search:
        <input id="search" type="text" />
      </label>
    </div>
  );
}

export default App;
