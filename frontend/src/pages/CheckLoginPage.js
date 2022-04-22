import { Link } from "react-router-dom"

function CheckLoginPage(props) {

  if (props.user === null) {
    return (
        <div id="check-login-content">
            <p id="check-login">You are not currently logged in. Please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.</p>
        </div>
    )
    
  }

  return (
    <div>
      { props.actualPage() }
    </div>
  )
}

export default CheckLoginPage;