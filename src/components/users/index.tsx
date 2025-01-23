import { useEffect, useState } from "react";
import { User } from "../user";
import { api } from "../../services/api";
import styles from "./index.module.css";

export interface Users {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export function Users() {
  const [data, setData] = useState<Users[] | null>(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        const { data } = await api.get("/users", { signal: signal });

        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usuários</h2>
      {data?.filter((user) => user.email !== email).length === 0 && (
        <p className={styles.empty}>Nenhum post criado</p>
      )}
      <div className={styles.users}>
        {data
          ?.filter((user) => user.email !== email)
          .map((user) => (
            <User user={user} key={user.id} />
          ))}
      </div>
    </div>
  );
}
