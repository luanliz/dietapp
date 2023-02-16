import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Text,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

const Cards = ({ name, key, procnt, img, total }) => {
  const [food, setFood] = useState();

  const onChangeFood = (e) => {
    setFood(e.target.value);
    console.log(food);
  };

  const submitFood = (e) => {
    e.preventDefaut();
  };

  return (
    <div>
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
      >
        <Card size="sm" id={key}>
          <CardHeader>
            <Heading size="sm">
              <img src={img} alt="" />
            </Heading>
          </CardHeader>
          <CardHeader>
            <Heading size="sm"> {name}</Heading>
          </CardHeader>
          <CardBody>
            <FormControl onSubmit={submitFood}>
              <Input
                type="number"
                value={food}
                onChange={onChangeFood}
                placeholder="Qtd Consumida(gramas)"
              ></Input>
              <Button onClick={onChangeFood}>ok</Button>
              <Text>Total Proteina: {total(procnt, food)} </Text>
            </FormControl>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default Cards;
