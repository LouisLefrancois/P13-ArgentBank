import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { setUser } from "../redux/userSlice";
import { authAPI } from "../services/api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Tentative de connexion...");
      const loginResponse = await authAPI.login(email, password);
      console.log("Login response:", loginResponse);
      const token = loginResponse.body.token;

      localStorage.setItem("token", token);

      dispatch(loginSuccess({ token }));

      console.log("Récupération du profil...");
      const profileResponse = await authAPI.getProfile();
      console.log("Profile response:", profileResponse);

      dispatch(
        setUser({
          email: profileResponse.body.email,
          firstName: profileResponse.body.firstName,
          lastName: profileResponse.body.lastName,
        })
      );

      navigate("/profile");
    } catch (err) {
      console.error("Erreur complète:", err);
      console.error("Réponse:", err.response?.data);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
