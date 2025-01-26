import { IconDots, IconPencil } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PostModal } from "../postModal/index";
import { UserModal } from "../userModal";
import { useData } from "../../useContext";
import { api } from "../../services/api";
import styles from "./index.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [name, setName] = useState("");
  const { user } = useData();

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        try {
          const controller = new AbortController();
          const signal = controller.signal;

          const { data } = await api.get(`/users/${user.email}`, {
            signal: signal,
          });
          setName(data.name);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUser();
  }, [user]);

  function onClosePost() {
    setPostModal(!postModal);
  }

  function onCloseUser() {
    setUserModal(!userModal);
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

        {userModal && <UserModal onClose={onCloseUser} name={name} />}
        {postModal && <PostModal onClose={onClosePost} />}
      </header>
    </div>
  );
}
