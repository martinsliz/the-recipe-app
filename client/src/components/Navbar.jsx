import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()
  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    navigate('/auth')
  }
  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/newRecipe">New Recipe</Link>
        <Link to="/savedRecipes">My Recipes</Link>
        {!cookies.access_token ? (
          <Link to="/auth">Register / Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  )
}

export default Navbar
