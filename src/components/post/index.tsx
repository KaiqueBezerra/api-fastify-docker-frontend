import { IconPencil, IconX } from "@tabler/icons-react";
import { PostModalEdit } from "../postModalEdit";
import { useState } from "react";
import { useData } from "../../useContext";
import { Posts } from "../posts";
import { api } from "../../services/api";
import styles from "./index.module.css";

export function Post({ post }: { post: Posts }) {
  const { user } = useData();
  const [modal, setModal] = useState(false);
  const email = localStorage.getItem("email");

  async function handleDelete(postId: string) {
    const confirm = window.confirm("Tem certeza que deseja excluir?");
    if (confirm) {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        await api.delete(`/posts/${postId}`, {
          headers: { email: email },
          signal: signal,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  function onClose() {
    setModal(!modal);
  }

  function formatDate(isoDate: string): string {
    // Converte a string ISO em um objeto Date
    const date = new Date(isoDate);

    // Extrai dia, mês, ano, horas e minutos
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Lembre-se que getUTCMonth() retorna 0-11
    const year = date.getUTCFullYear();

    // Horário ajustado para UTC-3 (Brasília, por exemplo)
    const hours = (date.getUTCHours() - 3 + 24) % 24; // Garantir que fique no intervalo 0-23
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    // Retorna no formato "dd/mm/yyyy hh:mm"
    return `${day}/${month}/${year} - ${hours
      .toString()
      .padStart(2, "0")}:${minutes}`;
  }

  const formattedDate = formatDate(post.createdAt);
  const formattedUpdateDate = formatDate(post.updatedAt);

  return (
    <div key={post.id} className={styles.post}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{post.title}</h3> {post.author && <span> {post.author.name}</span>}{" "}
        {user?.id === post.authorId && (
          <div>
            <IconPencil className={styles.pencil} onClick={onClose} />
            <IconX className={styles.x} onClick={() => handleDelete(post.id)} />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <p>{post.body}</p>
      </div>
      <div className={styles.date}>
        <p>{formattedDate} </p>
      </div>
      {formattedDate !== formattedUpdateDate && (
        <div className={styles.date}>
          <p>Atualizado em: {formattedUpdateDate}</p>
        </div>
      )}

      {modal && (
        <PostModalEdit
          onClose={onClose}
          id={post.id}
          title={post.title}
          body={post.body}
        />
      )}
    </div>
  );
}
