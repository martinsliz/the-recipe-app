import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()
  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.clear()
    navigate('/auth')
  }
  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/newRecipe">New Recipe</Link>
        {!cookies.access_token ? (
          <Link to="/auth">Register / Login</Link>
        ) : (
          <>
            <Link to="/savedRecipes">Saved Recipes</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
