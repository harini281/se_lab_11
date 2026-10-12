import { useEffect, useState } from 'react'
import { Search, ShoppingBag, Clock, Star, Utensils, ArrowRight } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5080'
const fallback = [
  { id: 1, name: 'Crispy Chicken Burger', category: 'Burgers', price: 850, description: 'Crispy chicken, fresh lettuce and house sauce.', emoji: '🍔', tag: 'Student favourite' },
  { id: 2, name: 'Classic Margherita Pizza', category: 'Pizza', price: 1200, description: 'Cheese, tomato and fragrant basil.', emoji: '🍕', tag: 'Freshly baked' },
  { id: 3, name: 'Rainbow Veggie Bowl', category: 'Healthy', price: 760, description: 'Colourful vegetables, rice and sesame dressing.', emoji: '🥗', tag: 'Veggie choice' },
  { id: 4, name: 'Iced Milo', category: 'Drinks', price: 350, description: 'A chilled chocolate malt drink.', emoji: '🥤', tag: 'Cool break' },
  { id: 5, name: 'Chicken Kottu', category: 'Rice & Noodles', price: 900, description: 'Sri Lankan-style chopped roti with chicken.', emoji: '🍲', tag: 'Local pick' },
  { id: 6, name: 'Chocolate Brownie', category: 'Desserts', price: 420, description: 'Rich chocolate brownie for your sweet break.', emoji: '🍫', tag: 'Sweet treat' }
]
const categories = ['All', 'Burgers', 'Pizza', 'Healthy', 'Drinks', 'Rice & Noodles', 'Desserts']

export default function App() {
  const [items, setItems] = useState(fallback)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [apiStatus, setApiStatus] = useState('Checking local API…')
  useEffect(() => {
    fetch(`${API}/api/menu`)
      .then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json() })
      .then(data => { if (Array.isArray(data) && data.length) setItems(data); setApiStatus('Connected to local API') })
      .catch(() => setApiStatus('Showing demo menu · API not connected'))
  }, [])
  const visible = items.filter(item => (category === 'All' || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase()))
  const add = item => setCart(prev => [...prev, item])
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0)
  return <div className="app">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-icon">C</span><span>Campus<span className="brand-accent">Eats</span><small>GOOD FOOD. GOOD MOOD.</small></span></a>
      <nav><a href="#menu">Explore menu</a><a href="#how">How it works</a></nav>
      <button className="cart-button" onClick={() => document.getElementById('cart')?.scrollIntoView({behavior:'smooth'})}><ShoppingBag size={17}/> My tray <b>{cart.length}</b></button>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="dot"/> YOUR CAMPUS FOOD HUB</span>
          <h1>Big cravings.<br/><em>Student prices.</em></h1>
          <p>Good food for your study breaks, late lectures and everything in between. Find your next campus favourite.</p>
          <a className="primary-button" href="#menu">Explore the menu <ArrowRight size={17}/></a>
          <div className="hero-meta"><span><Clock size={16}/> Quick campus picks</span><span><Star size={16} fill="currentColor"/> Made for students</span></div>
        </div>
        <div className="hero-art"><div className="sunburst"></div><div className="hero-food">🍔</div><div className="float-chip chip-one">Fresh & tasty ✨</div><div className="float-chip chip-two">From Rs. 350</div><div className="hero-note"><span>✦</span><div><b>Lunch sorted.</b><small>More time for what matters.</small></div></div></div>
      </section>
      <section className="stats"><div><b>6+</b><span>Campus favourites</span></div><div><b>Rs. 350</b><span>Starting price</span></div><div><b>Made for you</b><span>Simple student ordering</span></div></section>
      <section className="menu-section" id="menu">
        <div className="section-heading"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Find your <em>favourite.</em></h2></div><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the menu…"/></div></div>
        <div className="categories">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        <div className="food-grid">{visible.map(item=><article className="food-card" key={item.id}>
          <div className={`food-art food-${item.id}`}><span className="food-emoji">{item.emoji}</span><span className="food-tag">{item.tag}</span></div>
          <div className="food-info"><div className="food-category">{item.category}</div><h3>{item.name}</h3><p>{item.description}</p><div className="food-bottom"><strong>Rs. {Number(item.price).toLocaleString()}</strong><button aria-label={`Add ${item.name}`} onClick={()=>add(item)}>+</button></div></div>
        </article>)}</div>
        {visible.length===0 && <div className="empty">No menu items match that search. Try another name.</div>}
      </section>
      <section className="how" id="how"><div className="how-icon"><Utensils size={25}/></div><div><span className="eyebrow">EASY AS 1, 2, 3</span><h2>Your break, <em>your way.</em></h2><p>Explore the menu, add a favourite to your tray, and imagine a smoother campus lunch break.</p></div><div className="steps"><div><b>01</b><span>Choose a bite</span></div><div><b>02</b><span>Add to your tray</span></div><div><b>03</b><span>Enjoy your break</span></div></div></section>
      <section className="cart-section" id="cart"><div><span className="eyebrow">YOUR ORDER</span><h2>Your tray <em>({cart.length})</em></h2></div>{cart.length===0?<p className="muted">Your tray is empty. Add something delicious from the menu.</p>:<><ul className="cart-list">{cart.map((item,i)=><li key={`${item.id}-${i}`}><span>{item.emoji} {item.name}</span><b>Rs. {Number(item.price).toLocaleString()}</b></li>)}</ul><div className="cart-total"><span>Total</span><b>Rs. {total.toLocaleString()}</b></div><button className="primary-button" onClick={()=>alert('Demo only: ordering is not connected to a payment or order backend.')}>Continue <ArrowRight size={17}/></button></>}</section>
      <footer><a className="brand" href="#"><span className="brand-icon">C</span><span>Campus<span className="brand-accent">Eats</span></span></a><span>Made for campus life · Demo project</span><span className="api-status"><span className="dot"/>{apiStatus}</span></footer>
    </main>
  </div>
}
