import { Link } from "react-router";
import { Users } from "../users";
import styles from "./index.module.css";

export function User({ user }: { user: Users }) {
  return (
    <Link to={`/perfil/${user.id}`} className={styles.user} key={user.id}>
      <p>{user.name}</p>
    </Link>
  );
}
