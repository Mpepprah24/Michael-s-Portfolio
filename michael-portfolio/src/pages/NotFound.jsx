import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="2xl" color="purple.500">
        404
      </Heading>
      <Text fontSize="lg" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color="gray.500" mb={6}>
        The page you're looking for doesn't exist.
      </Text>
      <Button as={Link} to="/" colorPalette="purple">
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;