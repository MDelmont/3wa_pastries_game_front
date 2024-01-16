import "../styles/loginPage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminPastries from "../components/adminPastries";
import AddPastrieForm from "../components/addPastrieForm";
import { useEffect } from "react";
import { requestPastries } from "../store/pastriesSlices";

function AdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.loginSliceReducer);
  const { pastries } = useSelector((store) => store.pastriesSliceReducer);

  useEffect(() => {
    if (!auth) navigate(`/login`);
  }, [auth]);

  useEffect(() => {
    dispatch(requestPastries());
  }, []);

  return (
    <div className="admin-page">
      <button>Ajouter une pâtisserie</button>
      <AddPastrieForm />
      <p>Liste des pâtisseries</p>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pastries.length > 0 &&
            pastries.map((pastrie) => (
              <AdminPastries
                id={pastrie.id}
                titre={pastrie.name}
                chiffre={pastrie.quantity}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;