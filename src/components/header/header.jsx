import React, { useState, useEffect } from 'react'
import './header.css'
import { Box, Text, Avatar, Link, VStack, Divider, Tooltip, useDisclosure, Button } from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md';
import { FaCircleMinus } from "react-icons/fa6";
import { Icon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import Man from '../../assets/images/dashboard/man.png'
const minimizeMe = window.api;
export default function header() {
    const [sessName, setSessName] = useState('');
    const [showProfMenu, setShowProfMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleProfMenu = () => {
        setShowProfMenu(!showProfMenu);
    };

    useEffect(() => {
        setSessName(localStorage.getItem('sessionUName'));
        const handleClickOutside = (event) => {
            if (showProfMenu && !event.target.closest('.prof') && !event.target.closest('.profMenu')) {
                setShowProfMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfMenu]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleYesClick = () => {
        setLoading(true);
        localStorage.clear();
        
        window.location.reload();
        setLoading(false);
    }

    const minimizeApp = () => {
        // Minimize the app
        minimizeMe.minimize();
    };

    return (
        <Box>
            <Box className="header-top" w='97vw' h='3vh' bg='#355E3B' />
            <Tooltip hasArrow label="Minimize" bg='gray.300' color='black'>

                <Box pos='absolute' bg='#355E3B' h='3vh' w='35px' top='0' right='0'>
                    <Icon as={FaCircleMinus} color='Yellow' cursor='pointer' position='absolute' right='5px' mt='3px' onClick={minimizeApp} />
                </Box>
            </Tooltip>
            <Box className="row" h='7vh'>
                <Box className="col-md-6 ">
                    <Box id="company_name">
                        <Text fontSize='34px' fontWeight='extrabold' pl='12px' m='0'>RB<span style={{ color: '#355E3B' }}>MS</span></Text>
                    </Box>
                </Box>
                <Box className="col-md-6">
                    <Box className='d-flex align-items-center justify-content-end' pr='12px'>
                        <Box>
                            <Text m='0' fontWeight='bold' color='gray' >Hey, <span style={{ color: 'black' }}>{sessName}</span></Text>
                            <Text m='0' fontSize='12px' align='end'><span>{(localStorage.getItem('isSAdmin')==='true')?'Super Admin':'Admin'}</span></Text>
                        </Box>
                        <Box className='prof d-flex align-items-center' onClick={toggleProfMenu} cursor='pointer'>
                            <Avatar pl='2px' pt={0} size='md' src={Man} />
                            <Icon as={MdArrowDropDown} />
                        </Box>
                        <Box className='profMenu' w='150px' h='75px' p='12px' bg='#E2E2D5' pos='absolute' zIndex='999' mt='8rem' shadow='lg' rounded='md' display={showProfMenu ? 'block' : 'none'}>
                            <Box as='button' w='100%' _hover={{color: '#50C878'}}>
                                <Text m={0} textAlign='right'>Edit Profile</Text>
                            </Box>
                            <Divider orientation='horizontal' m='2px' borderColor='#355E3B' />
                            <Box as='button' w='100%' _hover={{color: '#50C878'}} onClick={onOpen}>
                                <Text m={0} textAlign='right'>Logout</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader textAlign='center'>Logout Confirm</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>Are you sure you want to logout?</Text>
                            </ModalBody>
                            <ModalFooter display='flex' justifyContent='center'>
                                <Button bg='#355E3B' w='125px' h='30px' color='white' rounded='lg' mr='5px' ml='5px' onClick={handleYesClick} isLoading={loading}>
                                    Yes
                                </Button>
                                <Box as='button' bg='#AB0505' w='125px' h='30px' color='white' rounded='lg' mr='5px' ml='5px'  onClick={onClose}>
                                    Cancel
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
            </Box>
        </Box>
    )
}
