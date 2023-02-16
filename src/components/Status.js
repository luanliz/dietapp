import React from "react";
import { Card, Heading, Text, Center } from "@chakra-ui/react";

const Status = ({ metas, total, falta }) => {
  return (
    <div>
      <Center>
        <Card bg="green.100">
          <Heading>Status</Heading>

          <Text>Meta Diária: </Text>
          <Text>Total Consumido: </Text>
          <Text>Faltam: </Text>
        </Card>
      </Center>
    </div>
  );
};

export default Status;
