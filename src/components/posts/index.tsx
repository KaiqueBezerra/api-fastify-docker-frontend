import { useEffect, useState } from "react";
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

export function Posts({ email }: { email?: string }) {
  const [data, setData] = useState<Posts[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const localStorageEmail = localStorage.getItem("email");

      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const { data } = await api.get(
          `/posts/${email ? email : localStorageEmail}`,
          {
            signal: signal,
          }
        );

        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, [email]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{email ? "Posts" : "Meus Posts"}</h2>
      {data?.length === 0 && <p className={styles.empty}>Nenhum post criado</p>}
      {data?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
