import React, { useEffect, useState } from "react";
import "./dashboardPage.css";
import { Box, Text, Image, Center, Button } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast
} from '@chakra-ui/react'


import loc from '../../assets/images/dashboard/loc.png'
import rev from '../../assets/images/dashboard/rev.png'
import bike from '../../assets/images/dashboard/bike.png'

const Card = ({ imageSrc, title, description, cardBgColor, imageBgColor, buttonBgColor, onClick, id }) => {
    return (
        <Box
            w='175px'
            h='225px'
            bg={cardBgColor}
            rounded='2xl'
            shadow='2xl'
            p='10px'
            pos='relative'
            className="cards"
            onClick={onClick}
            id={id}
        >
            <Box
                w='155px'
                h='115px'
                bg={imageBgColor}
                pos='relative'
                rounded='lg'
            >
                <Image
                    src={imageSrc}
                    boxSize='115px'
                    pos='absolute'
                    bottom='-5px'
                    left='20px'
                />
            </Box>
            <Box>
                <Text fontSize='lg' color='#000' m='0' mt='5px' textAlign='left'>
                    {title}
                </Text>
                <Text fontSize='sm' color='#000' m='0' textAlign='left'>
                    {description}
                </Text>
            </Box>
            <Center
                w='125px'
                h='40px'
                bg={buttonBgColor}
                position='absolute'
                bottom='-10px'
                right='-10px'
                shadow='lg'
                roundedTopLeft='50px'
                roundedBottomRight='20px'
            >
                <Box as='span' fontSize='sm'>View Details</Box>
            </Center>
        </Box>
    );
};

import { useShared } from '../../contextAPI.jsx'

const DashboardPage = () => {
    const { setActiveP, setActiveLink } = useShared();
    const [superadmin, setSuperadmin] = useState('');
    const toast = useToast();
    const handleCardClick = (cardName) => {
        setActiveP(cardName);
        setActiveLink(cardName);
    }

    const handleUnauthorized = () => {
        console.log(superadmin)
        toast({
            title: 'Unauthorized',
            description: 'You do not have permission to view this page.',
            status: 'warning',
            duration: 3000,
            position: 'top',
            isClosable: true,
        })
    }

    useEffect(() => {
        setSuperadmin(localStorage.getItem('isSAdmin'))
        
    }, [])
    return (
        <Box className="animate__animated animate__fadeInRight">
            <Box display='flex' gap='25px'>
                <Card
                    imageSrc={loc}
                    title="GPS TRACKING"
                    description="Current Location"
                    cardBgColor="#50C878"
                    imageBgColor="#43A564"
                    buttonBgColor="#8A9A5B"
                    onClick={() => handleCardClick('Gps Tracking')}
                />
                <Card
                    imageSrc={rev}
                    title="Analytics"
                    description="Revenue"
                    cardBgColor="#32BE9B"
                    imageBgColor="#2AAA8A"
                    buttonBgColor="#93C572"
                    onClick={(superadmin === 'true')
                        ?() => handleCardClick('Analytics')
                        :() => handleUnauthorized()}
                    id='revCard'
                />
                <Card
                    imageSrc={bike}
                    title="Availability"
                    description="Bicycle's Availability"
                    cardBgColor="#90EE90"
                    imageBgColor="#68BA68"
                    buttonBgColor="#96DED1"
                    onClick={() => handleCardClick('Availability')}
                />
            </Box>
            <Box w='600px' mt='50px' pos='relative'>
                <Box display='flex' alignItems='center' justifyContent='space-between' w='625px'>
                    <Box as="span" fontSize='2xl'>Reservations</Box>
                    <Box as="span" fontSize='md' position='relative' display='flex' right='0' w='120px' cursor='pointer' onClick={() => handleCardClick('Reservation')}>View Details <Box as="span" w='5px' h='20px' bg='#355E3B' display='flex' ml='5px' /></Box>
                </Box>

                <TableContainer className='Acctable' maxH='325px' overflowY='auto' >
                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Reserved Time</Th>
                                <Th>Duration of use</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Array.from({ length: 20 }, (_, index) => (
                                <Tr key={index}>
                                    <Td fontSize='sm'>name{index + 1}</Td>
                                    <Td fontSize='sm'>alas{index + 1}
                                    </Td>
                                    <Td fontSize='sm'>durationdaw</Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Reserved Time</Th>
                                <Th>Duration of use</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <Box>

                </Box>
            </Box>
        </Box>
    );
}

export default DashboardPage;