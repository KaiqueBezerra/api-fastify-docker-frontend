import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { api } from "../../services/api";
import styles from "./index.module.css";

export function PostModal({ onClose }: { onClose: VoidFunction }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const email = localStorage.getItem("email");
      const controller = new AbortController();
      const signal = controller.signal;

      await api.post(
        "/posts",
        {
          title,
          body,
        },
        { headers: { email: email }, signal: signal }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className={`${styles.overlay}`} onClick={handleOverlayClick}>
      <div className={`${styles.card}`} onClick={handleCardClick}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconX onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Titulo do post"
            required
            className={styles.input}
          />
          <input
            type="text"
            value={body}
            onChange={({ target }) => setBody(target.value)}
            placeholder="Corpo do post"
            required
            className={styles.input}
          />

          <button className={styles.btn} disabled={loading}>
            Criar
          </button>
        </form>
      </div>
    </div>
  );
}
