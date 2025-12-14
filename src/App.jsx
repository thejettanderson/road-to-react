import { useEffect, useReducer, useRef, useState } from 'react';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  console.log('App component rendered');

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'STORIES_FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'STORIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case 'REMOVE_STORY':
        return {
          ...state,
          data: state.data.filter(
            story => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
    };
  };

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!searchTerm) return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(`${API_ENDPOINT}${searchTerm}`).then(response => 
      response.json()
    ).then(result => {
      dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.hits});
    }).catch(() => {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    });
  }, [searchTerm]);

  const handleRemoveStory = (itemToRemove) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: itemToRemove,
    });
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch}><strong>Search:</strong></InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {!stories.isError && stories.isLoading ? (<p>Loading ...</p>) : (<List list={stories.data} onRemoveItem={handleRemoveStory} /> )}
    </div>
  );
}

const List = ({ list, onRemoveItem }) => {
  console.log('List component rendered');
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
}

const Item = ({ item, onRemoveItem }) => {
  console.log('Item component rendered for', item.title);
  return (
    <>
      <li>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
          <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
        </span>
      </li>
    </>
  );
}

const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {
  console.log('Input with label component rendered');

  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input ref={inputRef}id={id} type={type} value={value} onChange={onInputChange}/>
    </>
  );
}

export default App;
