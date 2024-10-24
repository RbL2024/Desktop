import React, { useEffect, useRef, useState } from 'react'
import './availabilityPage.css'
import { Box, Text, Grid, GridItem } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Icon,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftAddon
} from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";

const fetchAllbikes = window.api;

export default function AvailablityPage() {
    const inputRef = React.useRef(null);
    const [fetchedBikes, setFetchedBikes] = React.useState([]);

    const handleSearch = () => {
        const inputValue = 'BID-' + inputRef.current.value;
        console.log(inputValue);
    }

    const fetchBikes = async () => {
        try {
            const res = await fetchAllbikes.fetchBikes('fetch-bikes');
            setFetchedBikes(res);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        fetchBikes();
        const intervalId = setInterval(() => {
            fetchBikes(); // Fetch data every 5 seconds
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearInterval(intervalId);
    }, [])
    return (
        <Box>
            <Box className='legends' display='flex' justifyContent='space-between' w='950px' position='relative'>
                <Box width='120px' display='flex' alignItems='center' justifyContent='center' gap='12px' ml='50px'>
                    <Box display='flex' alignItems='center' justifyContent='center' gap='5px'>
                        <Box boxSize='12px' bg='#E37383' />
                        <Text fontSize='sm' m={0} mt='2px'>Rented</Text>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center' gap='5px'>
                        <Box boxSize='12px' bg='#939393' />
                        <Text fontSize='sm' m={0} mt='2px'>Vacant</Text>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center' gap='5px'>
                        <Box boxSize='12px' bg='#4396BD' />
                        <Text fontSize='sm' m={0} mt='2px'>User</Text>
                    </Box>
                </Box>
                <Box>
                    <FormControl>
                        <InputGroup>
                            <InputLeftAddon>
                                BID-
                            </InputLeftAddon>
                            <Input
                                w='200px'
                                type='text'
                                placeholder='Search by bike id'
                                ref={inputRef}
                            />
                            <Box>
                                <InputRightElement>
                                    <Icon
                                        as={FiSearch}
                                        boxSize={6}
                                        onClick={handleSearch}
                                    />
                                </InputRightElement>
                            </Box>

                        </InputGroup>
                    </FormControl>
                </Box>
            </Box>
            <Box mt='10px' w='950px' h='575px' rounded='2xl' shadow='lg' padding='20px' bg='#E2E2D5' overflowY='auto' className='BAvail'>
                <Grid templateColumns='repeat(5, 1fr)' gap={6} >
                    {
                        fetchedBikes.map((bike, index) => (
                            <GridItem key={index} w='150px' h='150px' bg='#FFFFFF' rounded='2xl' shadow='lg' p='10px' pos='relative'>
                                <Text textAlign='right' m='0'>{`#${(index + 1).toString().padStart(4, '0')}`}</Text>
                                {(bike.isRented === true)
                                    ? (
                                        <Box pos='relative' mt='25%'>
                                            <Box w='100%' h='30px' bg='#F8C8DC' rounded='md' display='flex' alignItems='center' justifyContent='space-between' p='10px' mb='5px'>
                                                <Text m={0}>Rented</Text>
                                                <Box boxSize='20px' bg='#E37383' rounded='md' />
                                            </Box>
                                            <Box w='100%' h='30px' bg='#A7C7E7' rounded='md' display='flex' alignItems='center' justifyContent='space-between' p='10px'>
                                                <Text m={0}>User</Text>
                                                <Box boxSize='20px' bg='#4396BD' rounded='md' />
                                            </Box>
                                        </Box>
                                    )
                                    :bike.isReserved === true && bike.isRented !== true
                                    ?(
                                        <Box pos='relative' mt='50%'>
                                            <Box w='100%' h='30px' bg='#f9f871' rounded='md' display='flex' alignItems='center' justifyContent='space-between' p='10px' mb='5px'>
                                                <Text m={0} width='100%' textAlign='center'>RESERVED</Text>
                                            </Box>
                                        </Box>
                                    )
                                    : (
                                        <Box pos='relative' mt='50%'>
                                            <Box w='100%' h='30px' bg='#939393' rounded='md' display='flex' alignItems='center' justifyContent='space-between' p='10px' mb='5px'>
                                                <Text m={0} width='100%' textAlign='center'>VACANT</Text>
                                            </Box>
                                        </Box>
                                    )
                                }
                            </GridItem>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}
