import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
  <Header/>
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
        <img
          src="https://i.pinimg.com/originals/df/d4/e2/dfd4e225cc85666fd320a8f2ffe7b96d.jpg"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        src="https://tse3.mm.bing.net/th/id/OIP.Q0E-r7mUQcGa8wPlCv6jJgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)

export default Home
