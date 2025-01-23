import { AllPosts } from "../components/allPosts";
import { Header } from "../components/header";
import { Posts } from "../components/posts";
import { Users } from "../components/users";
import styles from "./index.module.css";

export function Index() {
  return (
    <div className={styles.principal}>
      <Header />
      <Posts />
      <Users />
      <AllPosts />
    </div>
  );
}
