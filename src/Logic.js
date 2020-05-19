import React, { useState, useEffect } from 'react';
import './App.css';
import { Product } from './Product';
import Spinner from 'react-bootstrap/Spinner'

function Logic({ product, loading }) {

  const [pomocni, setPomocni] = useState([]);
  const [brend, setBrend] = useState([]);
  const [kategorija, setKategorija] = useState([]);


  useEffect(() => {
    handleSelectAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brend, kategorija])

  const handleChange = (e) => {
    if (e.target.value === '') {
      setPomocni([]);
      return
    } else {
      let vrednost = e.target.value;
      let filtrirani = product.filter(el => el.product_type.toLowerCase().includes(vrednost))
        && product.filter(el => el.name.toLowerCase().includes(vrednost));
      setPomocni(filtrirani);
    }
  }


  const getUnique = (arr, comp) => {

    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }

  const uniqueBrand = getUnique(product, 'brand');
  const uniqueCategory = getUnique(product, 'category');


  const handleSelect = (e) => {
    let selected = product.filter(el => el.brand === e.target.value)
    setBrend(selected)
  }

  const handleSelect2 = (e) => {
    let selected2 = product.filter(el => el.category === e.target.value)
    setKategorija(selected2)
  }

  const handleSelectAll = () => {
    if (brend.length === 0) {
      setPomocni(kategorija)
      return
    }
    if (kategorija.length === 0) {
      setPomocni(brend)
      return
    }
    let kljucevi1 = brend.map(b => b.id)
    let kljucevi2 = kategorija.map(k => k.id)

    let presekKljuceva = kljucevi1.filter(b => kljucevi2.includes(b))
    let selected3 = brend.filter(p => presekKljuceva.includes(p.id))
    setPomocni(selected3)    
  }

  return (
    <>
      <div>
        <h1>MakeApp DAN</h1>
      </div>
      <div>
        <input type="text" onChange={e => handleChange(e)} placeholder="Search..."></input>

        <select onChange={(e) => handleSelect(e)}>
          <option>Brand</option>
          {uniqueBrand.map(el => {
            if (el.brand !== null && el.brand !== "") {
              return <option key={el.id}>{el.brand}</option>
            } else {
              return null
            }
          })}
        </select>
          
        <select onChange={e => handleSelect2(e)}>
          <option>Category</option>
          {uniqueCategory.map(el => {
            if (el.category !== null && el.category !== "") {
              return <option key={el.id} >{el.category}</option>
            } else {
              return null
            }
          })}
        </select>
      </div>

      <div>
        {loading ? pomocni.map(el => <Product product={el} key={el.id} />) :
          <div className="spinner" >
            <Spinner animation="grow" variant="primary" />
          </div>}
      </div>
    </>
  );
}

export default Logic;
