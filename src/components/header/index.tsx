import { IconDots, IconPencil } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PostModal } from "../postModal/index";
import styles from "./index.module.css";
import { api } from "../../services/api";
import { UserModal } from "../userModal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [post, setPost] = useState(false);
  const [name, setName] = useState("");
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function fetchUser() {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const { data } = await api.get(`/users/${email}`, { signal: signal });
        setName(data.name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [email]);

  function onClosePost() {
    setPost(!post);
  }

  function onCloseUser() {
    setUser(!user);
  }

  function logout() {
    localStorage.removeItem("email");
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>
            Bem Vindo <span className={styles.name}>{name}</span>
            <IconPencil className={styles.pencil} onClick={onCloseUser} />
          </h1>
        </div>
        <IconDots className={styles.icon} onClick={() => setOpen(!open)} />
        {open && (
          <div className={styles.options}>
            <ul className={styles.list}>
              <li className={styles.item} onClick={onClosePost}>
                Criar Post
              </li>
              <li className={styles.item1} onClick={logout}>
                Sair
              </li>
            </ul>
          </div>
        )}

        {user && <UserModal onClose={onCloseUser} name={name} />}
        {post && <PostModal onClose={onClosePost} />}
      </header>
    </div>
  );
}
