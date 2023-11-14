import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../components/RegisterForm.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRegisterUser } from "../features/userSlice.jsx";
import Swal from "sweetalert2";

function Register() {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setRegisterUser(inputData));
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      Swal.fire({
        title: "Success !",
        text: data.message,
        icon: "success",
      });
      navigate("/login");
    }

    if (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  }, [data, error, navigate]);
  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      setRegisterUserLoading={loading}
    />
  );
}

export default Register;
