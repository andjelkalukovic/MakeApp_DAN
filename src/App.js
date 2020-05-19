import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Logic from './Logic';
import PublicRoute from './PublicRoutes';
import { OneProduct } from './OneProduct';
import { getAllData } from './services/Services';


function App() {
  
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllData().then(res =>{
      setProduct(res.data)
      console.log(res.data)
      setLoading(true)
    })
  },[])

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute component={() => <Logic product={product} loading={loading}/>} path="/logic" />
          <PublicRoute component={OneProduct} path="/oneproduct/:id" />
          <Redirect from='/' to='logic' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
