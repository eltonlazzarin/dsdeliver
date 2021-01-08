import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Orders from './pages/Orders';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact component={Home} path="/" />
      <Route component={Orders} path="/orders" />
    </BrowserRouter>
  );
};

export default Routes;
