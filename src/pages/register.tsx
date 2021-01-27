import React from "react";
import {Form, Formik} from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from "@chakra-ui/react";
import {Wrapper} from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {



    const [, register] = useRegisterMutation();
    return ( 
    <Wrapper variant="small">
    <Formik 
        
    initialValues={{username: "", password: ""}} 
    onSubmit={async (values) => {
        const response = await register(values);
    }}>

    {({isSubmitting}) => (

    <Form>
            <InputField 
            name='username'
            placeholder='username'
            label='Username'
            />

            <Box mt={4}>
            <InputField
            name='password'
            placeholder='password'
            label='Password'
            type='password'
            />
            </Box>
            
            <Box mt={4}>
            <Button
            type='submit'
            isLoading= {isSubmitting}
            colorScheme='teal'>
                Register
            </Button>
            </Box>
          
    </Form>
    )}
    </Formik>
    </Wrapper>
    );
};

export default Register;