import { useState } from "react";
import { useData } from "../../useContext";
import { IconX } from "@tabler/icons-react";
import { api } from "../../services/api";
import styles from "./index.module.css";

export function PostModalEdit({
  onClose,
  id,
  title,
  body,
}: {
  onClose: VoidFunction;
  id: string;
  title: string;
  body: string;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [loading, setLoading] = useState(false);
  const { user } = useData();

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
      const controller = new AbortController();
      const signal = controller.signal;

      await api.patch(
        `/posts/${id}`,
        {
          title: newTitle,
          body: newBody,
        },
        { headers: { email: user?.email }, signal: signal }
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
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="Novo titulo do post"
            required
            className={styles.input}
          />
          <input
            type="text"
            value={newBody}
            onChange={({ target }) => setNewBody(target.value)}
            placeholder="Novo corpo do post"
            required
            className={styles.input}
          />

          <button className={styles.btn} disabled={loading}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
