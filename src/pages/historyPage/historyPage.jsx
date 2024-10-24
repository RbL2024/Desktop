import React, { useEffect, useState } from 'react'
import './historyPage.css'
import { Box, Text, Select, Button, ScaleFade } from '@chakra-ui/react'
import { MdArrowDropDown } from "react-icons/md";
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
} from '@chakra-ui/react'


const fetchAdminAcc = window.api;

export default function UserPage() {
    const [selectedQueue, setselectedQueue] = useState('User-Accounts');
    const [loading, setLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState([]);
    const [isSAdmin, setisSAdmin] = useState('');
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track the selected row index
    

    const fetchWalkIn = async () => {
        console.log('walkin');
    }

    const fetchReservation = async () => {
        console.log('reservation');
    }


    const handleSelectChange = (event) => {
        setselectedQueue(event.target.value);
        // console.log("Selected Account Type:", event.target.value);
    };


    const handleApply = () => {
        if (selectedQueue === 'walk-in') {
            fetchWalkIn();
        }
        if (selectedQueue === 'reservation') {
            fetchReservation();
        }
    }
    

    const handleRowClick = (index) => {
        setSelectedRowIndex(index); // Set the selected row index
        const selectedRow = fetchedData[index];

    };
    
    
    return (
        <Box>
            <Box display='flex'>
                <Select icon={<MdArrowDropDown />} w='200px' height='30px' outline='none' border='none' variant='unstyled' value={selectedQueue} onChange={handleSelectChange}>
                    {/* <option value="" hidden>Accounts</option> */}
                    <option value="walk-in">Walk In</option>
                    <option value="reservation">Reservation</option>
                </Select>
                <Button onClick={handleApply} ml='5px' mr='5px' bg='#355E3B' height='30px' width='120px' color='white' rounded='12px' isLoading={loading}>
                    Apply
                </Button>
            </Box>
            <Box mt='10px' bg='#E2E2D5' w='975px' h='585px' shadow='lg' rounded='2xl'>
                <TableContainer className='Acctable' maxH='580px' overflowY='auto' rounded='2xl'>
                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Address</Th>
                                <Th>Contact No.</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Array.from({length: 20}, (_,index) => (
                                <Tr
                                    key={index} 
                                    onClick={() => handleRowClick(index)} // Set selected row index on click
                                    bg={selectedRowIndex === index ? 'blue.100' : '#E2E2D5'} // Change background if selected
                                    cursor="pointer" // Change cursor to pointer
                                >
                                    <Td fontSize='sm'>{index + 1}</Td>
                                    <Td fontSize='sm'>
                                        {`Name ${index+1}`}<br/>
                                        <Text fontSize='smaller' m='0'>{`user${index+1}`}</Text>
                                    </Td>
                                    <Td fontSize='sm'>{`Email ${index+1}`}</Td>
                                    <Td fontSize='sm'>{`Address ${index+1}`}</Td>
                                    <Td fontSize='sm'>{`Contact No. ${index+1}`}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Address</Th>
                                <Th>Contact No.</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
