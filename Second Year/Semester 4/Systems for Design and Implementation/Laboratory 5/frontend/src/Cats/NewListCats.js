import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
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

function NewListCats(props) {
    const [cats, setCats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("http://localhost:8000/cats_filter/" + props.weight)
            .then((response) => response.json())
            .then((data) => {
                setCats(data.data)
                setIsLoading(false)
            })
    }, [props.weight])

    const pStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.5,
        color: '#777',
        marginBottom: '1.5rem',
        textShadow: '1px 1px #eee'
    }

    return (
        <>
            {cats.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ ...pStyle }}>
                    No cats found.
                </Typography>
            ) : (
                <TableContainer>
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableHeadCell>ID</StyledTableHeadCell>
                                <StyledTableHeadCell>Name</StyledTableHeadCell>
                                <StyledTableHeadCell>Age</StyledTableHeadCell>
                                <StyledTableHeadCell>Color</StyledTableHeadCell>
                                <StyledTableHeadCell>Breed</StyledTableHeadCell>
                                <StyledTableHeadCell>Weight</StyledTableHeadCell>
                                <StyledTableHeadCell>Owner</StyledTableHeadCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {cats.map((cat) => {
                                return (
                                    <StyledTableRow key={cat.id}>
                                        <StyledTableCell>{cat.id}</StyledTableCell>
                                        <StyledTableCell>{cat.name}</StyledTableCell>
                                        <StyledTableCell>{cat.age}</StyledTableCell>
                                        <StyledTableCell>{cat.color}</StyledTableCell>
                                        <StyledTableCell>{cat.breed}</StyledTableCell>
                                        <StyledTableCell>{cat.weight}</StyledTableCell>
                                        <StyledTableCell>{cat.ownerId}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            )}
            {isLoading && <Typography variant="body1" align="center" sx={{ color: "#777" }}>Loading...</Typography>}
        </>
    )
}

export default NewListCats