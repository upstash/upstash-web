import {
  Container,
  SimpleGrid,
  Heading,
  Text,
  Box,
  Avatar
} from '@chakra-ui/react'

export default function SectionTestimonial() {
  return (
    <Box as="section" mt={['40px', '80px']} mb={['100px', '220px']} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading as="h2" size="2xl">
            Loved by people like you
          </Heading>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 2]} spacing={10}>
          {[
            {
              photo: '/testimonial/donny.jpg',
              name: 'Donny West',
              title: 'Architect, Nzxt',
              content:
                'Upstash has been a great fit for our needs. Upstash fits perfectly with our serverless stack, and empowers our full-stack web engineers to leverage Redis without costly and time-consuming infrastructure management and dev ops. The straightforward pricing and great service and support has been icing on the cake!'
            },
            {
              photo: '/testimonial/joe.jpg',
              name: 'Joe Emison',
              title: 'Co-Founder and CTO, Branch',
              content:
                "Upstash has saved us a significant amount of money and effort over Redis Enterprise, especially around scaling. Redis Enterprise's solution requires a painful and expensive process once you exceed 50GB in storage. Upstash, in contrast, is a modern, serverless service that encapsulates the Redis API that we need, without having any of the pain of having to think about and deal with the underlying infrastructure that it runs on."
            },
            {
              photo: '/testimonial/rauch.jpeg',
              name: 'Guillermo Rauch',
              title: 'Founder of Next.js and Vercel',
              content:
                'Upstash is rethinking the Data Platform from a serverless design paradigm, which is the most exciting transformation we’ve seen in the cloud since its start. Developers love serverless for code, it’s now the time to bring serverless to data.'
            },
            {
              photo: '/testimonial/nate.jpg',
              name: 'Nate Weiss',
              title: 'CTO at Conductrics',
              content:
                'Upstash is enabling Conductrics to migrate some of our important workloads to serverless functions without breaking our latency or financial budgets. This helps our SaaS service to scale nicely for our customers, staying responsive even during sudden traffic spikes. Great support as well!'
            }
          ].map(({ photo, name, title, content }) => {
            return (
              <TestimonialCard
                key={name}
                photo={photo}
                name={name}
                title={title}
              >
                {content}
              </TestimonialCard>
            )
          })}
        </SimpleGrid>

        {/**/}
      </Container>
    </Box>
  )
}

export function TestimonialCard({ photo, name, title, children, ...props }) {
  return (
    <Box
      d="flex"
      textAlign="left"
      borderRadius="md"
      bgColor="whiteAlpha.100"
      pt="8"
      pr="8"
      pb="8"
      pl="6"
      {...props}
    >
      <Avatar name={name} src={photo} size="md" />
      <Box ml={4}>
        <Box as="header">
          <Heading as="h5" size="sm">
            {name}
          </Heading>
          <Text mt={1} fontSize="sm" color="whiteAlpha.600">
            {title}
          </Text>
        </Box>
        <Text mt={4} fontSize="md">
          {children}
        </Text>
      </Box>
    </Box>
  )
}
