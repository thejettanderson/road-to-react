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

const App = () => (
  <div>
    <h1>My Hacker Stories</h1>

    <Search />

    <hr />

    <List />
  </div>
);

const List = () => (
  <ul>
    {list.map(item => (
      <Item key={item.objectID} {...item} />
    ))}
  </ul>
);

const Item = (item) => {
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

const Search = () => {
  // perform a task in between
  const handleChange = (event) => {
    // synthetic event
    console.log(event);
    // value of taget (here: input HTML element)
    console.log(event.target.value);
  }

  const handleBlur = (event) => {
    console.log('Input lost focus');
  }

  return (
    <div>
      <label htmlFor="search">Search:
        <input id="search" type="text" onChange={handleChange} onBlur={handleBlur}/>
      </label>
    </div>
  );
}

export default App;
