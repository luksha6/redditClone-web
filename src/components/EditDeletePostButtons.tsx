import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtons {
    id: number;
    creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtons> = ({
    id,
    creatorId
}) => {

    const [{ data: meData }] = useMeQuery();
    const [, deletePost] = useDeletePostMutation();

    if (meData?.me?.id !== creatorId ) {
        return null;
    } else {
    return (
            <Box>
                <NextLink href="/post/edit/[id]" as ={`/post/edit/${id}`}>
                <Link>
                <EditIcon  color='yellow.500' cursor='pointer'></EditIcon>
                </Link>
            </NextLink>
            <Link>
                <DeleteIcon ml={2} mt='auto' color='red.500' cursor='pointer' onClick={() => {
                deletePost({id })
                }}></DeleteIcon>
                </Link>
            </Box>
                );
        }
}