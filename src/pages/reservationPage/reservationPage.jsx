import React from 'react'
import './reservationPage.css'
import { Box, Text} from '@chakra-ui/react'

export default function ReservationPage() {
    return (
        <Box>
             <Text>Reservation Page</Text>
        </Box>
    )
}

// function getRandomLightColor() {
//     // Generate random values for RGB components, ensuring they are light
//     const r = Math.floor(Math.random() * 156) + 100; // 100 to 255
//     const g = Math.floor(Math.random() * 156) + 100; // 100 to 255
//     const b = Math.floor(Math.random() * 156) + 100; // 100 to 255

//     // RGB format
//     const rgbColor = `rgb(${r}, ${g}, ${b})`;

//     // Hex format
//     const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

//     return { rgb: rgbColor, hex: hexColor };
// }

// // Example usage
// const randomColor = getRandomLightColor();
// console.log('Random Light Color in RGB:', randomColor.rgb);
// console.log('Random Light Color in Hex:', randomColor.hex);