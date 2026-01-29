import { useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white ">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Demo Stable
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {user.name}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-50 px-4 py-2 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white text-sm hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
