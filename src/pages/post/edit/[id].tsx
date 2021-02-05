import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';

const EditPost = ({}) => {
    const router = useRouter();
    const intId = useGetIntId();
    const [{data, fetching}] = usePostQuery({
        pause: intId === -1,
        variables: {
            id: intId
        }
    });
    const [, updatePost] = useUpdatePostMutation();

    if (fetching) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        )
    }

    if (!data?.post) {
        return (
            <Layout>
                <div>could not find post</div>
            </Layout>
        )
    }
   
    return (<Layout variant='small'>
                <Formik   
                initialValues={{title: data?.post.title, text: data.post.text }}
                onSubmit={async (values) => {
                const {error} = await updatePost({id: intId, ...values })
                if (!error) {
                    router.back();
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
                        Update post
                    </Button>
                    </Box>
                
            </Form>
            )}
            </Formik>
            </Layout>);
}

export default withUrqlClient(createUrqlClient, {ssr: true})(EditPost);