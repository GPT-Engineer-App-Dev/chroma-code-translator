import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [hexCode, setHexCode] = useState("");
  const [colorName, setColorName] = useState("");
  const toast = useToast();

  const fetchColorName = async () => {
    if (!hexCode.match(/^#?([0-9A-F]{3}){1,2}$/i)) {
      toast({
        title: "Invalid HEX code",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`https://api.color.pizza/v1/${hexCode.replace("#", "")}`);
      const data = await response.json();

      if (data.colors && data.colors.length > 0) {
        setColorName(data.colors[0].name);
      } else {
        setColorName("Unknown color");
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.toString(),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={5} align="stretch" p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Color Name Translator
      </Heading>
      <Box display="flex" alignItems="center">
        <Input placeholder="Enter HEX code (e.g., #1a1a1a)" value={hexCode} onChange={(e) => setHexCode(e.target.value)} />
        <Button leftIcon={<FaSearch />} ml={2} colorScheme="blue" onClick={fetchColorName}>
          Translate
        </Button>
      </Box>
      {colorName && (
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Color Name:
          </Text>
          <Text fontSize="xl">{colorName}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Index;
