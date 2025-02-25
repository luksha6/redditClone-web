import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from '../utils/useIsAuthlts';

const CreatePost: React.FC<{}> = ({}) => {

    const router = useRouter();
    useIsAuth();
    const [,createPost] = useCreatePostMutation();
    return (
        <Layout variant='small'>
            <Formik 
         
        initialValues={{title: "", text: ""}} 
        onSubmit={async (values, {setErrors}) => {
            const {error} = await createPost({input: values})
            if (!error) {
                router.push('/');
            }
            
        }}>
    
        {({isSubmitting}) => (
    
        <Form>
                <InputField 
                name='title'
                placeholder='title'
                label='Title'
                />
    
                <Box mt={4}>
                <InputField
                textarea
                name='text'
                placeholder='text...'
                label='Body'
                />
                </Box>
    

                <Box mt={4}>
                <Button
                type='submit'
                isLoading= {isSubmitting}
                colorScheme='teal'>
                    Create post
                </Button>
                </Box>
              
        </Form>
        )}
        </Formik>
        </Layout>
    );
}

export  default withUrqlClient(createUrqlClient)(CreatePost);