const welcome = {
  greeting: 'Hey',
  title: 'React',
}

function getTitle(title) {
  return title;
}

function App() {
  // you can do something in between

  return (
    <div>
      <h1>{welcome.greeting} {getTitle('World')}</h1>
      <label htmlFor="search">Search:
        <input id="search" type="text" />
      </label>
      
    </div>
  );
}

export default App;
