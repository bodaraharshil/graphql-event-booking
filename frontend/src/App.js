import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Auth from './pages/Auth';
import Event from './pages/Event';
import Booking from './pages/Booking';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route from="/auth" tp="/auth" exact />
        <Route path="/auth" component={Auth} />
        <Route path="/event" component={Event} />
        <Route path="/booking" component={Booking} />
      </div>
    </BrowserRouter>
  );
}

export default App;
