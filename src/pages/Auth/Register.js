import "./Auth.css";

//Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { register, reset } from "../../slices/authSlice";

//Chakra UI
import { Button, Input, Stack, Center, Image } from "@chakra-ui/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);
    dispatch(register(user));
  };

  //Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
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
      <p className="subtitle">Cadastre-se para usar o Diet Fepe App</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <Input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && (
          <Button colorScheme="blue" type="submit" value="Cadastrar">
            Cadastrar
          </Button>
        )}
        {loading && (
          <Button colorScheme="green" type="submit">
            Aguarde...
          </Button>
        )}

        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  );
};

export default Register;
