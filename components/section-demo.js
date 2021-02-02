import {useState} from 'react'
import {Container, Box, VStack} from '@chakra-ui/react'
import Bg from './bg'
import Header from './section-demo-header'
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'
import {sizes} from '../theme'
import {useAuth0} from '@auth0/auth0-react'

function SectionDemo(props) {
    const auth0 = useAuth0()

    const [loading, loadingSet] = useState(false)
    const [db, dbSet] = useState()
    const [apierror, apierrorSet] = useState(null)
    const [url, urlSet] = useState(process.env.NEXT_PUBLIC_CONSOLE_URL)


    const onCreateDB = async (region, dbName) => {
        loadingSet(true)
        let url = process.env.NEXT_PUBLIC_API_URL
        let token = localStorage.getItem('accessToken')
        let profile = localStorage.getItem('profile');
        let temp = process.env.NEXT_PUBLIC_CONSOLE_URL + "callback?profile=" + profile
            + "&token=" + token
        alert(temp)
        urlSet(temp)

        const postData = {
            'database_name': dbName,
            'region': region,
            'type': "free",
            'tls': false,
            'consistent': false,
        };
        console.log(postData)
        const response = await fetch(url + 'databases', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        if (response.status == 200) {
            const data = await response.json()
            dbSet(data)
        } else {
            const data = await response.json()
            apierrorSet(data)
            loadingSet(false)
        }
    }

    return (
        <Box
            as="section"
            pos="relative"
            overflow="hidden"
            marginTop="32px"
            pb={['80px', '160px']}
            textAlign="center"
            {...props}
        >
            <Bg top={`${sizes.bubble / 2}px`}/>

            <Container maxW="5xl">
                {/* */}

                <VStack spacing={[20, 32]} align="stretch">
                    <VStack spacing={[8, 12]} align="stretch">
                        <Header
                            number="1"
                            title="Create"
                            desc="Create your database in seconds."
                        />
                        <Box>
                            <Step1
                                auth0={auth0}
                                db={db}
                                apierror={apierror}
                                loading={loading}
                                onCreateDB={onCreateDB}
                            />
                        </Box>
                    </VStack>

                    <VStack spacing={[8, 12]} align="stretch">
                        <Header
                            number="2"
                            title="Connect"
                            desc="Connect with any Redis client from anywhere."
                        />
                        <Box>
                            <Step2 db={db}/>
                        </Box>
                    </VStack>
                    {db && (
                        <VStack spacing={[8, 12]} align="stretch">
                            <Header
                                number="3"
                                title="And More"
                                desc="The console awaits you for more"
                            />
                            <Box>
                                <Step3 url={url}/>
                            </Box>
                        </VStack>
                    )}
                </VStack>


                {/*  */}
            </Container>
        </Box>
    )
}

export default SectionDemo
