import {Box, VStack, Button, Spinner, Stack} from '@chakra-ui/react'
import {useEffect} from 'react'
import User from './user'
import Error from './error'
import CustomLink from "../custom-link";
import {LINKS} from "../../constants";

export default function CreateButton({auth0, loading, onCreateDB, apierror}) {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithPopup,
        logout,
        getAccessTokenSilently
    } = auth0

    useEffect(() => {
        async function getToken() {
            if (isAuthenticated) {
                localStorage.setItem('accessToken', await getAccessTokenSilently());
                localStorage.setItem('profile', await JSON.stringify(user));
            }
        }
        !isLoading && getToken()
    }, [isLoading, getAccessTokenSilently])

    return (
        <VStack spacing={6} align="stretch">
            {isLoading && (
                <Box>
                    <Spinner/>
                </Box>
            )}

            {error && <Error message={"Authentication failed."}/>}
            {apierror && <Error message={apierror}/>}

            {isAuthenticated ? (
                <VStack spacing={6} align="stretch">
                    <User logout={logout} {...user} />

                    <Button
                        w="full"
                        color="black"
                        bg="primary"
                        _hover={{}}
                        isLoading={loading}
                        onClick={onCreateDB}
                    >
                        Create
                    </Button>
                </VStack>
            ) : (
                <VStack spacing={6} align="stretch">
                    <Button
                        w="full"
                        color="black"
                        bg="primary"
                        _hover={{}}
                        onClick={loginWithPopup}
                    >
                        Log in to Create
                    </Button>
                    <Box fontSize="9pt">
                        By clicking Log in, you agree to our 
                         <CustomLink ml="3px" isExternal noIcon={true} href={LINKS.terms} >
                                   Terms of Service
                        </CustomLink>  and
                         <CustomLink isExternal noIcon={true} href={LINKS.privacy} >
                             Privacy Policy
                        </CustomLink>.
                    </Box>
                </VStack>
            )}


        </VStack>
    )
}
