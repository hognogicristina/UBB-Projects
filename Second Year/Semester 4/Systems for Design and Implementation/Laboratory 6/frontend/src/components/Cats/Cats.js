import ListCats from "./ListCats"
import OneCat from "./OneCat"
import FilterCats from "./FilterCats"
import RaportCat from "./RaportCat"
import AddCat from "./AddCat"
import DeleteCat from "./DeleteCat"
import UpdateCat from "./UpdateCat"
import { useState } from "react"
import { Box, Button, Typography } from "@mui/material"

function Cats() {
    const [showList, setShowList] = useState(false)
    const [showCat, setShowCat] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showRaport, setShowRaport] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const handleShowListClick = () => {
        setShowList(true)
        setShowCat(false)
        setShowFilter(false)
        setShowRaport(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleShowCatClick = () => {
        setShowCat(true)
        setShowList(false)
        setShowFilter(false)
        setShowRaport(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleShowFilterClick = () => {
        setShowFilter(true)
        setShowList(false)
        setShowCat(false)
        setShowRaport(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleShowRaportClick = () => {
        setShowRaport(true)
        setShowList(false)
        setShowCat(false)
        setShowFilter(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleAddClick = () => {
        setShowAddForm(true)
        setShowList(false)
        setShowCat(false)
        setShowFilter(false)
        setShowRaport(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleDeleteClick = () => {
        setShowDeleteForm(true)
        setShowList(false)
        setShowCat(false)
        setShowFilter(false)
        setShowRaport(false)
        setShowAddForm(false)
        setShowUpdateForm(false)
    }

    const handleUpdateClick = () => {
        setShowUpdateForm(true)
        setShowList(false)
        setShowCat(false)
        setShowFilter(false)
        setShowRaport(false)
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
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2, color: '#7c487c' }}>
                Hi there! Welcome to the Cats Section. Here you can see all the cats in the database, you can filter them by weight or breed. 
                Also if you want you can acces a specific cat.
                And you can also add, update or delete a cat.
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
                    <Button onClick={handleShowListClick} sx={buttonStyles}>Go Back</Button>
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
                        <Button onClick={handleShowCatClick} sx={buttonStyles}>One Cat</Button>
                        <Button onClick={handleShowFilterClick} sx={buttonStyles}>Filter Cats</Button>
                        <Button onClick={handleShowRaportClick} sx={buttonStyles}>Raport Cats</Button>
                    </Box>
                </>
            )}
            {showCat ? (
                <>
                    <OneCat /> 
                </>
            ) : null}
            {showFilter ? (
                <>
                    <FilterCats />
                </>
            ) : null}
            {showRaport ? (
                <>
                    <RaportCat />
                </>
            ) : null}
        </Box>
    )
}

export default Cats
