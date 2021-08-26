import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <div className='container'>
        <div className='row'>
      <div className="explore-card col-12">
        <button
          className="btn col-12"
          type="button"
          data-testid="explore-food"
          name="Explorar Comidas"
          onClick={() => {
            history.push('/explorar/comidas');
          }}
        >
          <span className='rec-name'>Explorar Comidas</span>
        </button>
      </div>
      <div className="explore-card col-12">
        <button
          className="btn col-12"
          type="button"
          data-testid="explore-drinks"
          onClick={() => {
            history.push('/explorar/bebidas');
          }}
          name="Explorar Bebidas"
        >
          <span className='rec-name'>Explorar Bebidas</span>
        </button>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
// explore-food e explore-drinks.
