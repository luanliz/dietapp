import React from "react";
import { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorage";
import Cards from "../../components/Cards";

import {
  Grid,
  GridItem,
  Button,
  Heading,
  Input,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import Status from "../../components/Status";

const Goal = () => {
  const [data, setData] = useState(getItem("dietFepe") || []);
  const [goal, setGoal] = useState();

  const removeItem = (obj) => {
    const arrFilter = data.filter(
      (item) => item.food.foodId !== obj.food.foodId
    );
    setData(arrFilter);
    setItem("dietFepe", arrFilter);
    console.log("aqui", arrFilter);
    console.log("aqui2", setItem);
  };

  const proteinAll = (protein, food) => {
    return (protein / 100) * food;
  };

  const onChangeGoal = (e) => {
    setGoal(e.target.value);
  };

  return (
    <>
      <Center>
        <Box>
          <Text>Meta(em gramas):</Text>
        </Box>
      </Center>

      <Center>
        <Input
          placeholder="Digite sua meta diária"
          htmlSize={100}
          width="auto"
          type="number"
          value={goal}
          onChange={onChangeGoal}
        />
      </Center>

      <Status metas={goal} total="50" falta="10" />

      <Heading>Meta</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {data.map((item) => {
          return (
            <GridItem w="100%" h="100%">
              <Cards
                key={item.food.foodId}
                name={item.food.label}
                procnt={item.food.nutrients.PROCNT}
                img={item.food.image}
                total={proteinAll}
              />

              <Button colorScheme="red" onClick={() => removeItem(item)}>
                Remover
              </Button>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default Goal;
