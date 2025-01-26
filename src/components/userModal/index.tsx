import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { api } from "../../services/api";
import styles from "./index.module.css";
import { useData } from "../../useContext";

export function UserModal({
  onClose,
  name,
}: {
  onClose: VoidFunction;
  name: string;
}) {
  const [newName, setNewName] = useState(name);
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
        "/users",
        {
          name: newName,
        },
        { headers: { email: user?.email }, signal: signal }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);

    const confirm = window.confirm(
      "Tem certeza que deseja excluir a conta? Todos os posts também serão excluidos."
    );
    if (confirm) {
      try {
        const email = localStorage.getItem("email");
        const controller = new AbortController();
        const signal = controller.signal;

        await api.delete("/users", {
          headers: { email: email },
          signal: signal,
        });

        localStorage.removeItem("email");

        window.location.reload();
      } catch (error) {
        console.log(error);
      }
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
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
            placeholder="Novo nome"
            required
            className={styles.input}
          />

          <button type="submit" className={styles.btn} disabled={loading}>
            Salvar
          </button>

          <button
            type="button"
            className={styles.btnDelete}
            onClick={handleDelete}
            disabled={loading}
          >
            Excluir conta
          </button>
        </form>
      </div>
    </div>
  );
}
