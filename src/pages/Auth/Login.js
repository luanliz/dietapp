import "./Auth.css";
import {
  Button,
  FormControl,
  Input,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <Center>
        <Stack direction="row">
          <Image
            boxSize="100px"
            width="100px"
            height="50px"
            objectFit="cover"
            src="./fepe_logo.png"
            alt="dietapp_fepe"
          />
        </Stack>
      </Center>
      <p className="subtitle">Faça o login para acessar o DietApp.</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!loading && (
          <Button colorScheme="blue" type="submit">
            Entrar
          </Button>
        )}
        {loading && (
          <Button colorScheme="green" type="submit" disabled value="Aguarde">
            Aguarde ...
          </Button>
        )}

        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
