import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [vote] = useVoteMutation();

    return (
        <Flex 
         direction="column" 
         justifyContent="center" 
         alignItems="center" 
         mr={4}>
          <Box>
          <ArrowUpIcon
          onClick={() => {
              vote({
                  postId: post.id,
                  value: 1
              });
          }} 
          cursor="pointer"
          w={8} 
          h={8} 
          color="green.800" />
          </Box>
          {post.points} 
          <Box>
          <ArrowDownIcon 
          onClick={() => {
            vote({
                postId: post.id,
                value: -1
            });
          }} 
          cursor="pointer"
          w={8} 
          h={8} 
          color="red.800" />
          </Box>
         </Flex>
    );
};