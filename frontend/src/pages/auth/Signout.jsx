import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Signout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-semibold">Logging you out...</h2>
    </div>
  );
};

export default Signout;
