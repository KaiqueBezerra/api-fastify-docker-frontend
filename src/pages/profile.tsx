import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./profile.module.css";
import { api } from "../services/api";
import { Posts } from "../components/posts";

export function Profile() {
  const [name, setName] = useState("");
  const id = useParams().id;
  useEffect(() => {
    async function fetchUser() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const { data } = await api.get(`/users/user/${id}`, { signal: signal });
        setName(data.name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [id]);

  return (
    <div className={styles.principal}>
      <div className={styles.container}>
        <h1 className={styles.name}>{name}</h1>
      </div>

      {id && <Posts id={id} />}
    </div>
  );
}
