import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../services/api";
import styles from "./login.module.css";
import { IconArrowRight } from "@tabler/icons-react";
import { useData } from "../useContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setLogin, autoLogin } = useData();

  useEffect(() => {
    if (login === true) {
      navigate("/");
    }
  }, [login, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const controller = new AbortController();
      const signal = controller.signal;

      await api.get(`/users/${email}`, { signal: signal });

      if (email) {
        localStorage.setItem("email", email);
        setLogin(true);
        autoLogin();
        navigate("/");
      } else {
        setEmail("Digite um email válido");
      }
    } catch (error) {
      console.log(error);
      setEmail("Email não encontrado");
    }

    setLoading(false);
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.linkContainer}>
            <Link to="/registro" className={styles.link}>
              Cadastrar
            </Link>
            <IconArrowRight />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
