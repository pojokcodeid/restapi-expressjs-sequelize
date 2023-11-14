import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/Menu.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../features/userSlice.jsx";
import Swal from "sweetalert2";

function Profile() {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const user = secureLocalStorage.getItem("user");
  const [inputData, setInputData] = useState({
    userId: user.userId,
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setProfile(inputData));
  };

  useEffect(() => {
    if (data) {
      Swal.fire({
        title: "Success !",
        text: data.message,
        icon: "success",
      });
      secureLocalStorage.setItem("user", { userId: user.userId, ...data.data });
      navigate("/");
    }

    if (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  }, [data, error, navigate, user]);
  return (
    <div>
      <Menu />
      <ProfileForm
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
        updateProfileLoading={loading}
      />
    </div>
  );
}

export default Profile;
