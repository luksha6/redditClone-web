import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import { Layout } from "../components/Layout";
import { UpdootSection } from '../components/UpdootSection';
import { useDeletePostMutation, useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

 const Index = () => {
   const [variables, setVariables] = useState({
     limit: 15, 
     cursor: null as null | string
    });

   const [{ data: meData }] = useMeQuery();
   const [{data, fetching}] = usePostsQuery({
     variables,
   });
   
   const [, deletePost] = useDeletePostMutation();

   if (!fetching && !data) {
     return <div>query failed</div>
   } 

   return(
    <Layout>
        <Flex>
          <Heading>Posts</Heading>
        </Flex>
      
      <br />
    
      {!data && fetching ? ( 
      <div>loading...</div>
      ) : (
      <Stack spacing={8}>
      {data!.posts.posts.map((p) => 
      !p ? null : (
       <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
         <UpdootSection post={p}></UpdootSection>
        <Box flex={1}>
        <NextLink href="/post/[id]" as ={`/post/${p.id}`}>
          <Link>
            <Heading fontSize="xl">{p.title}</Heading> 
          </Link>
        </NextLink>
        <Text> posted by {p.creator.username }</Text>
        <Flex>
         <Text flex={1} mt={4}>{p.textSnippet}</Text>
         {meData?.me?.id !== p.creatorId ? null :
         <Flex ml='auto' mt='auto'>
         <NextLink href="/post/edit/[id]" as ={`/post/edit/${p.id}`}>
          <Link>
            <EditIcon  color='yellow.500' cursor='pointer'></EditIcon>
         </Link>
        </NextLink>
        <Link>
         <DeleteIcon ml={2} mt='auto' color='red.500' cursor='pointer' onClick={() => {
           deletePost({id: p.id})
         }}></DeleteIcon>
         </Link>
        </Flex>
        }
        
        </Flex>
        </Box>
       </Flex>
          ))}
       </Stack>
      )}
   
        {data && data.posts.hasMore ? (
          <Flex>
             <Button onClick={() => {
               setVariables({
                 limit: variables.limit,
                 cursor: data.posts.posts[data.posts.posts.length -1].createdAt,
               })
              }} sLoading={fetching} my={8}>load more</Button>
         </Flex>
        ) : null }
   </Layout>
);
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
 