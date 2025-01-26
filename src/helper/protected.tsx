import { Navigate } from "react-router";
import { useData } from "../useContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { login } = useData();

  if (login === null) {
    // Mostra um loader ou retorna vazio até verificar o estado de login
    return <div>Carregando...</div>;
  }

  if (login === true) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
