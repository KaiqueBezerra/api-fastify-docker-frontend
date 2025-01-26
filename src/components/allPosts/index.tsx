import { useEffect, useState } from "react";
import { useData } from "../../useContext";
import { Posts } from "../posts";
import { Post } from "../post";
import { api } from "../../services/api";
import styles from "./index.module.css";

export function AllPosts() {
  const [data, setData] = useState<Posts[] | null>(null);
  const { user } = useData();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const { data } = await api.get("/posts/", {
          signal: signal,
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
      {data?.filter((post) => post.author.email !== user?.email).length ===
      0 ? (
        <div>
          <h2 className={styles.title}>Todos os Posts</h2>
          <p className={styles.empty}>Nenhum post criado</p>
        </div>
      ) : (
        <h2 className={styles.title}>Todos os Posts</h2>
      )}

      {data
        ?.filter((post) => post.author.email !== user?.email)
        .map((post) => (
          <Post post={post} key={post.id} />
        ))}
    </div>
  );
}
