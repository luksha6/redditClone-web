import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [, vote] = useVoteMutation();

    return (
        <Flex 
         direction="column" 
         justifyContent="center" 
         alignItems="center" 
         mr={4}>
          <Box>
          <ArrowUpIcon
          onClick={() => {
              if (post.voteStatus === 1) {
                  return;
              }
              vote({
                  postId: post.id,
                  value: 1
              });
          }} 
          cursor="pointer"
          w={8} 
          h={8} 
          color={post.voteStatus === 1 ? 'green.500' : undefined} />
          </Box>
          {post.points} 
          <Box>
          <ArrowDownIcon 
          onClick={() => {
            if (post.voteStatus === -1) {
                return;
            }
            vote({
                postId: post.id,
                value: -1
            });
          }} 
          cursor="pointer"
          w={8} 
          h={8} 
          color={post.voteStatus === -1 ? 'red.500' : undefined} />
          </Box>
         </Flex>
    );
};