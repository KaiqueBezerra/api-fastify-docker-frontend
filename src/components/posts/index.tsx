import { useEffect, useState } from "react";
import { useData } from "../../useContext";
import { Post } from "../post";
import { api } from "../../services/api";
import styles from "./index.module.css";

export interface Posts {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function Posts({ id }: { id?: string }) {
  const [data, setData] = useState<Posts[] | null>(null);
  const { user } = useData();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        if (id) {
          const { data } = await api.get(`/posts/${id}`, {
            signal: signal,
          });

          setData(data);
        } else {
          const { data } = await api.get(`/posts/${user?.id}`, {
            signal: signal,
          });

          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, [id, user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{id ? "Posts" : "Meus Posts"}</h2>
      {data?.length === 0 && <p className={styles.empty}>Nenhum post criado</p>}
      {data?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
