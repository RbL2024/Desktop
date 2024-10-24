import React, { useEffect, useState } from 'react'
import 'animate.css'
import { Box, Button, useDisclosure, Input, InputGroup, InputRightElement, Icon } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { FaEyeSlash, FaEye } from "react-icons/fa";

import Header from './components/header/header.jsx';
import Sidenav from './components/sidenav/sidenav.jsx';

import DashboardPage from './pages/dashboardPage/dashboardPage.jsx';
import UserPage from './pages/accountsPage/accountsPage.jsx';
import HistoryPage from './pages/historyPage/historyPage.jsx';
import AnalyticsPage from './pages/analyticsPage/analyticsPage.jsx';
import ReservationPage from './pages/reservationPage/reservationPage.jsx';
import UploadPage from './pages/uploadPage/uploadPage.jsx';
import AvailabilityPage from './pages/availabilityPage/availabilityPage.jsx';
import GpstrackingPage from './pages/gpstrackingPage/gpstrackingPage.jsx';

import { SharedProvider, useShared } from './contextAPI.jsx'

const closeMe = window.api;
const findAcc = window.api;

const ContentWrapper = () => {
    const { activeP } = useShared();

    const renderContent = () => {
        switch (activeP) {
            case 'Dashboard':
                return <DashboardPage />;
            case 'User':
                return <UserPage />;
            case 'History':
                return <HistoryPage />;
            case 'Analytics':
                return <AnalyticsPage />;
            case 'Reservation':
                return <ReservationPage />;
            case 'Upload':
                return <UploadPage />;
            case 'Availability':
                return <AvailabilityPage />;
            case 'Gps Tracking':
                return <GpstrackingPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <Box className='content-page' pos='absolute' w='100vw' h='100vh' top='0' mt='10vh' ml='250px'>
            {renderContent()}
        </Box>
    )
}

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleAccountFound = (event) => {
        const res = event.detail;
        if (res.found) {
            console.log(res.found);

            toast({
                title: 'You are now logged in',
                description: 'Welcome to your dashboard.',
                status: 'success',
                duration: 2000,
                position: 'top',
                onCloseComplete: () => {
                    onClose();
                    setLoading(false);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('sessionUName', res.uname);
                    localStorage.setItem('isSAdmin', res.sAdmin);
                    window.location.reload();
                }
            });
        } else {
            console.log(res.found);
            toast({
                title: 'Invalid Credentials',
                description: 'Please check your username and password',
                status: 'error',
                duration: 2000,
                position: 'top',
                onCloseComplete: () => {
                    setUsername('');
                    setPassword('');
                    setLoading(false);
                }
            });
            return
        }
    };

    const handleBtnLogin = () => {
        setLoading(true);
        try {
            const data = {
                i_username: username,
                i_password: password
            }
            findAcc.findAccount(data);


            // Add event listener for account-found
            window.addEventListener('account-found', handleAccountFound);

            // Cleanup function to remove the event listener
            return () => {
                window.removeEventListener('account-found', handleAccountFound);
            };
            // window.addEventListener('account-found', (event) => {
            //     const res = event.detail;
            //     if (res.found) {
            //         console.log(res.found);
            //         localStorage.setItem('isLoggedIn', 'true');
            //         localStorage.setItem('sessionUName', res.uname);
            //         localStorage.setItem('isSAdmin', res.sAdmin);
            //         // setLoading(false)
            //         // window.location.reload();
            //         // onClose();
            //         toast({
            //             title: 'You are now logged in',
            //             description: 'Welcome to your  dashboard.',
            //             status: 'success',
            //             duration: 2000,
            //             position: 'top',
            //             onCloseComplete: () => {
            //                 onClose();
            //                 window.location.reload();
            //                 setLoading(false)
            //                 toast.closeAll();
            //             }
            //         })
            //     } else {
            //         console.log(res.found);
            //         toast({
            //             title: 'Invalid Credentials',
            //             description: 'Please check your username and password',
            //             status: 'error',
            //             duration: 2000,
            //             position: 'top',
            //             onCloseComplete: () => {
            //                 setUsername('')
            //                 setPassword('');
            //                 setLoading(false)
            //                 toast.closeAll();
            //             }
            //         })
            //     }
            // })
        } catch (error) {
            console.log(error);
        }

    }
    const handleBtnExit = () => {
        closeMe.close();
    }



    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') === 'true') {
            onClose();
        } else {
            onOpen();
        }
    }, []);

    return (
        <SharedProvider>
            <Box w='100vw' h='100vh' bg='#D6D6CA'>
                <Header />
                <Sidenav /*setActivePage={setActivePage}*/ />
                <ContentWrapper />
                {/* <Box className='content-page' pos='absolute' w='100vw' h='100vh' top='0' mt='10vh' ml='250px'>
                    {renderContent()}
                </Box> */}
                <Box pos='absolute' w='100vw' h='100vh' top='0' mt='10vh' ml='250px' zIndex='-1'>
                    <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)' />
                        <ModalContent>
                            <ModalHeader>Login</ModalHeader>
                            {/* <ModalCloseButton /> */}
                            <ModalBody>
                                <FormControl mb={5}>
                                    <FormLabel m={0}>Username</FormLabel>
                                    <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel m={0}>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputRightElement>
                                            <Icon
                                                as={showPassword ? FaEye : FaEyeSlash}
                                                onClick={() => setShowPassword(!showPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter display='flex' justifyContent='center'>

                                <Button ml='5px' mr='5px' as='button' bg='#355E3B' height='30px' width='120px' color='white' rounded='12px' onClick={handleBtnLogin} isLoading={loading}>
                                    Login
                                </Button>
                                <Box ml='5px' mr='5px' as='button' bg='#AB0505' height='30px' width='120px' color='white' rounded='12px' onClick={handleBtnExit}>
                                    Exit
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        </SharedProvider>
    )
}



