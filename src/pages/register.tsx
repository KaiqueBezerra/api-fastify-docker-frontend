import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import styles from "./register.module.css";
import { IconArrowRight } from "@tabler/icons-react";

export function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const controller = new AbortController();
      const signal = controller.signal;

      await api.post(
        "/users/",
        {
          name,
          email,
        },
        { signal: signal }
      );

      if (email !== "") {
        navigate("/login");
      } else {
        setEmail("Digite um email válido");
      }
    } catch (error) {
      console.log(error);
      setEmail("Email já registrado");
    }

    setLoading(false);
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Registro</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.linkContainer}>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <IconArrowRight />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}
