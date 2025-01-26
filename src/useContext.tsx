import {
  useState,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { api } from "./services/api";

interface Context {
  login: boolean;
  user: User | null;
  setLogin: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  autoLogin: () => Promise<void>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const UseContext = createContext<Context | null>(null);

export const useData = () => {
  const context = useContext(UseContext);
  if (!context) throw new Error("useData precisa estar em DataContextProvider");
  return context;
};

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function autoLogin() {
    const email = window.localStorage.getItem("email");

    try {
      if (email) {
        const { data } = await api.get(`/users/${email}`);
        if (data) {
          setLogin(true);
          setUser(data);
        } else {
          setLogin(false);
          window.localStorage.removeItem("email");
          setUser(null);
        }
      } else {
        setLogin(false);
        setUser(null);
        window.localStorage.removeItem("email");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <UseContext.Provider value={{ login, user, setLogin, setUser, autoLogin }}>
      {children}
    </UseContext.Provider>
  );
};
