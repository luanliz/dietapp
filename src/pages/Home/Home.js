import "./Home.css";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../../services/LocalStorage";

import {
  Grid,
  GridItem,
  Input,
  Button,
  FormControl,
  Center,
  IconButton,
} from "@chakra-ui/react";
import Cards from "../../components/Cards";
import { SearchIcon } from "@chakra-ui/icons";

const Home = () => {
  const [endPoint, setEndpoints] = useState("");
  const [cart, setCart] = useState(getItem("dietFepe") || []);

  const [luan, setLuan] = useState([]);

  useEffect(() => {
    fetchMe();
  }, [endPoint]);

  const fetchMe = () => {
    fetch(
      `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=+${endPoint}`,
      options
    )
      .then((response) => response.json())

      .then((data) => {
        setLuan(data.hints);
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const onChangeHandler = (e) => {
    setEndpoints(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleClick = (obj) => {
    console.log(obj.food.foodId);
    const element = cart.find((e) => e.food.foodId === obj.food.foodId);
    if (element) {
      const arrFilter = cart.filter((e) => e.food.foodId !== obj.food.foodId);
      setCart(arrFilter);
      setItem("dietFepe", arrFilter);
    } else {
      setCart([...cart, obj]);
      setItem("dietFepe", [...cart, obj]);
    }
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d33f4d8414msh70f0f8418a78946p14b7a6jsnaed600ac4379",
      "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
    },
  };

  const proteinAll = (protein, food) => {
    return (protein / 100) * food;
  };

  return (
    <div>
      <FormControl onSubmit={submitHandler}>
        <Center>
          <IconButton
            colorScheme="green"
            aria-label="Search database"
            icon={<SearchIcon />}
          />
          <Input
            htmlSize={60}
            width="auto"
            focusBorderColor="blue.400"
            variant="outline"
            size="lg"
            type="text"
            placeholder="Pesquisar"
            value={endPoint}
            onChange={onChangeHandler}
          />
        </Center>
      </FormControl>

      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {luan.map((item) => {
          return (
            <GridItem w="80%" h="70%">
              <Cards
                key={item.food.foodId}
                name={item.food.label}
                procnt={item.food.nutrients.PROCNT}
                img={item.food.image}
                total={proteinAll}
              />

              {cart.some(
                (itemCart) => itemCart.food.foodId === item.food.foodId
              ) ? (
                <Button onClick={() => handleClick(item)} colorScheme="red">
                  Remover
                </Button>
              ) : (
                <Button onClick={() => handleClick(item)} colorScheme="blue">
                  Adicionar
                </Button>
              )}
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
