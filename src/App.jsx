const title = 'React!';

function App() {
  // you can do something in between

  return (
    <div>
      <h1>Hello {title}</h1>
      <label htmlFor="search">Search:
        <input id="search" type="text" />
      </label>
      
    </div>
  );
}

export default App;
