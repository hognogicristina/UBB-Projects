import ListCats from "./ListCats"
import FilterCats from "./FilterCats"
import AddCat from "./AddCat"
import DeleteCat from "./DeleteCat"
import UpdateCat from "./UpdateCat"
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material";

function Cats() {
    const [showList, setShowList] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const handleShowListClick = () => {
        setShowList(true)
        setShowFilter(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleShowFilterClick = () => {
        setShowFilter(true)
        setShowList(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleAddClick = () => {
        setShowAddForm(true)
        setShowList(false)
        setShowFilter(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleDeleteClick = () => {
        setShowDeleteForm(true)
        setShowList(false)
        setShowFilter(false)
        setShowAddForm(false)
        setShowUpdateForm(false)
    }

    const handleUpdateClick = () => {
        setShowUpdateForm(true)
        setShowList(false)
        setShowFilter(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
    }

    const buttonStyles = {
        backgroundColor: 'transparent',
        color: '#7c487c',
        border: '2px solid #7c487c',
        margin: 1,
        zIndex: 0,
        '&:hover': {
            backgroundColor: '#e2c7f7d8',
            color: '7c487c',
        }
    }

    return (
        <Box>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c', border: '2px solid #7c487c', boxShadow: '4px 4px 0 #7c487c' }}>
                Cats Section
            </Typography>
            {showList ? (
                <>
                    <ListCats />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleAddClick} sx={buttonStyles}>Add a Cat</Button>
                        <Button onClick={handleUpdateClick} sx={buttonStyles}>Update a Cat</Button>
                        <Button onClick={handleDeleteClick} sx={buttonStyles}>Delete a Cat</Button>
                        <Button onClick={() => setShowList(false)} sx={buttonStyles}>Go Back</Button>
                    </Box>
                </>
            ) : showAddForm ? (
                <>
                    <AddCat />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : showUpdateForm ? (
                <>
                    <UpdateCat />
                    <Button onClick={handleShowListClick} sx={{ ...buttonStyles }}>Go Back</Button>
                </>
            ) : showDeleteForm ? (
                <>
                    <DeleteCat />
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleShowListClick} sx={buttonStyles}>List Cats</Button>
                        <Button onClick={handleShowFilterClick} sx={buttonStyles}>Filter Cats</Button>
                    </Box>
                </>
            )}
            {showFilter ? (
                <>
                    <FilterCats />
                </>
            ) : null}
        </Box>
    )
}

export default Cats
