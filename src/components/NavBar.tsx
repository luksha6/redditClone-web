import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {

}


export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery();
    let body = null;

    if (fetching) {
    
    } else if (!data?.me) {
        body = (
            <>
             <NextLink href="/login">
             <Link mr={2}>login</Link>
             </NextLink>
             <NextLink href="/register">
             <Link>register</Link>
             </NextLink>
            </>
        );

    } else {
        body = (
            <Flex align='center'>
                <NextLink href='/create-post'>
                     <Button as={Link} mr={4}>
                         create post
                     </Button>
                 </NextLink>
                <Box mr={2}>{data.me.username}</Box>
                <Button 
                onClick={ () => {
                    logout();
                }}
                isLoading={logoutFetching} 
                variant='link'> logout</Button>
            </Flex>
            
        );
    }

    return (
        <Flex position='sticky' top={0}  zIndex={1} bg='tan' p={4} align='center'> 
            <Flex flex={1} m='auto' align='center' maxW={800}>
            <NextLink href="/">
                <Link>
                    <Heading>SimpleBlog</Heading>
                </Link>
            </NextLink>
            <Box ml={'auto'}>
              { body }
            </Box>
            </Flex>
        </Flex>
    );
}