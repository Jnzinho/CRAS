import Navbar from './components/Navbar';

const App = () => {
  return (
    <div classname="main">
      <Navbar></Navbar>
      <div className="buttons">
        <button class="button is-primary">Primary</button>
        <button class="button is-link">Link</button>
        <button class="button is-info">Info</button>
        <button class="button is-success">Success</button>
        <button class="button is-warning">Warning</button>
        <button class="button is-danger">Danger</button>
        <button class="button is-black">Black</button>
        <button class="button is-white">White</button>
        <button class="button is-dark">Dark</button>
        <button class="button is-light">Light</button>
      </div>
    </div>
  );
};

export default App;
