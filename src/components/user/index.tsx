import { Link } from "react-router";
import { Users } from "../users";
import styles from "./index.module.css";

export function User({ user }: { user: Users }) {
  return (
    <Link to={`/perfil/${user.email}`} className={styles.user} key={user.id}>
      <p>{user.email}</p>
    </Link>
  );
}
