import { useState, useEffect } from "react"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'

const StyledTable = styled(Table)({
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
})

const StyledTableCell = styled(TableCell)({
    padding: 8,
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
})

const StyledTableHeadCell = styled(StyledTableCell)({
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
})

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
})

function ListFoods() {
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetch("https://adopt-a-cat.onrender.com/foods")
            .then((response) => response.json())
            .then((data) => {
                setFoods(data.data);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c', border: '2px solid #7c487c', boxShadow: '4px 4px 0 #7c487c' }}>
                Food Section
            </Typography>
            <TableContainer>
                <StyledTable>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableHeadCell>ID</StyledTableHeadCell>
                            <StyledTableHeadCell>Name</StyledTableHeadCell>
                            <StyledTableHeadCell>Brand</StyledTableHeadCell>
                            <StyledTableHeadCell>Price</StyledTableHeadCell>
                            <StyledTableHeadCell>Quantity</StyledTableHeadCell>
                            <StyledTableHeadCell>Type</StyledTableHeadCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {foods.map((food) => (
                            <StyledTableRow key={food.id}>
                                <StyledTableCell>{food.id}</StyledTableCell>
                                <StyledTableCell>{food.name}</StyledTableCell>
                                <StyledTableCell>{food.brand}</StyledTableCell>
                                <StyledTableCell>{food.price}</StyledTableCell>
                                <StyledTableCell>{food.quantity}</StyledTableCell>
                                <StyledTableCell>{food.type}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Box>
    )
}

export default ListFoods