import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { Layout } from "../components/Layout";
import { UpdootSection } from '../components/UpdootSection';
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

 const Index = () => {
   const [variables, setVariables] = useState({
     limit: 15, 
     cursor: null as null | string
    });

   const [{data, fetching}] = usePostsQuery({
     variables,
   });

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
          <Box  ml='auto' mt='auto'>
            <EditDeletePostButtons 
            id={p.id} 
            creatorId={p.creatorId} />
          </Box>
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
 