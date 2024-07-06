import { Button, Row, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/featuers/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/featuers/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHFrom from "../components/form/PHFrom";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    
    const toastId = toast.loading("Loggin in", { duration: 2000 });

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );
      navigate(`/${user?.role}/dashboard`);
      toast.success("Logged in", { id: toastId, duration: 2000 });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHFrom onSubmit={onSubmit} defaultValues={defaultValues}>
        <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>Login</h2>
        <PHInput type="text" name="userId" label="ID:" />

        <PHInput type="password" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHFrom>
    </Row>
  );
};

export default Login;
