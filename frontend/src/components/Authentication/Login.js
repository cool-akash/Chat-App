import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, FormControl, FormLabel, Input, InputRightElement, VStack } from '@chakra-ui/react'
import {  InputGroup} from "@chakra-ui/input";
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const Login = () => {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  
  const handleClick = () => setShow(!show)

  const submitHandler = async() => {
    setLoading(true);
    if (!email || !password) {
            toast({
                toast: "Please Fill All The Fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
            return;
    }
    
    try {
       const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
      const { data } = await axios.post("/api/user/login", { email, password }, config);
      
      toast({
                toast: "Login Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
      })
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      
      history.push('/chats');
    } catch (error) {
      toast({
                toast: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
      
    }

  }


  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("12345678");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login