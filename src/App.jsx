import { useState } from 'react';

const App = () => {
  console.log('App component rendered');
  const stories = [
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
  const [searchTerm, setSearchTerm] = useState('React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter(story => story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} search={searchTerm}/>

      <hr />

      <List list={searchedStories} />
    </div>
  );
}

const List = (props) => {
  console.log('List component rendered');
  const { list } = props;
  return (
    <ul>
      {list.map(item => (
        <Item key={item.objectID} {...item} />
      ))}
    </ul>
  );
}

const Item = (item) => {
  console.log('Item component rendered for', item.title);
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

const Search = (props) => {
  console.log('Search component rendered');

  return (
    <div>
      <label htmlFor="search">Search:
        <input id="search" type="text" value={props.search} onChange={props.onSearch}/>
      </label>
    </div>
  );
}

export default App;
