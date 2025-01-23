import { useEffect, useState } from "react";
import { Posts } from "../posts";
import { Post } from "../post";
import { api } from "../../services/api";
import styles from "./index.module.css";

export function AllPosts() {
  const [data, setData] = useState<Posts[] | null>(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const { data } = await api.get("/posts/", {
          signal: signal, // Passando o sinal para a requisição
        });

        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      {data?.filter((post) => post.author.email !== email).length === 0 ? (
        <div>
          <h2 className={styles.title}>Todos os Posts</h2>
          <p className={styles.empty}>Nenhum post criado</p>
        </div>
      ) : (
        <h2 className={styles.title}>Todos os Posts</h2>
      )}

      {data
        ?.filter((post) => post.author.email !== email)
        .map((post) => (
          <Post post={post} key={post.id} />
        ))}
    </div>
  );
}
