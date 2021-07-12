import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Mainnavigation from './component/navigation/Mainnavigation';
import Auth from './pages/Auth';
import Event from './pages/Event';
import Booking from './pages/Booking';

function App() {
  return (
    <BrowserRouter>
      <Mainnavigation />
      <main className="main_content">
        <Switch>
          <div className="App">
            <Route from="/auth" to="/auth" exact />
            <Route path="/auth" component={Auth} />
            <Route path="/event" component={Event} />
            <Route path="/booking" component={Booking} />
          </div>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
