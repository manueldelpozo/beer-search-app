import React, { Fragment, useState, useEffect, useRef } from 'react'
import fetchBeers from '../api/fetchBeers.js'
import BeerList from './BeerList.js'
import * as errorMessages from '../constants/errorMessages'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Search from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    form: {
        margin: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
    formControl: {
        width: '100%',
        textAlign: 'left',
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
    },
    groupItem: {
        flexGrow: 1
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    list: {
        margin: theme.spacing(3),
    }
}))

export default function BeerSearchPanel() {
    const classes = useStyles()
    const [searchBy, setSearchBy] = useState('beer_name')
    const [isValidInput, setIsValidInput] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [beers, setBeers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const inputEl = useRef(null)

    const validation = {
        beer_name: {
            regexp: /^[0-9A-Za-z\s-]+$/,
            errorMessage: errorMessages.ERROR_BEER_NAME
        },
        brewed_before: {
            regexp: /^(0[1-9]|1[012])-\d{4}$/,
            errorMessage: errorMessages.ERROR_BEER_BEFORE_BEWED
        }
    }

    const validateInput = () => {
        const isValid = inputEl.current.value === '' || validation[searchBy].regexp.test(inputEl.current.value)
        setIsValidInput(isValid)
        setErrorMessage(isValid ? '' : validation[searchBy].errorMessage)
    }

    const changeSearchBy = (event) => {
        setSearchBy(event.target.value)
    }

    const searchBeer = (event) => {
        event.preventDefault()
        if (isValidInput) {
            fetchBeersBy()
        }
    }

    useEffect(() => {
        validateInput()
    }, [searchBy])

    const showErrorMessage = (message) => {
        setIsValidInput(false)
        setErrorMessage(message)
        inputEl.current.focus()
    }

    const fetchBeersBy = () => {
        setIsLoading(true)
        fetchBeers(`?${searchBy}=${inputEl.current.value}`).then(response => {
            if (response.length === 0) {
                showErrorMessage(errorMessages.ERROR_BEER_LIST_EMPTY)
            } else {
                setBeers(response)
            }
        }).catch((error) => {
            showErrorMessage(error)
        })
        setIsLoading(false)
    }

    return (
        <Fragment>
            <form className={classes.form} onSubmit={ searchBeer }>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            inputRef={inputEl}
                            id="input-search"
                            label={`Type a ${searchBy.replace('_', ' ').replace('before', ' beer before date (MM-YYYY)')}`}
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            onInput={ validateInput }
                            error={ !isValidInput }
                            helperText={ errorMessage }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Search by</FormLabel>
                            <RadioGroup
                                aria-label="seach by"
                                name="searchBy"
                                className={classes.group}
                                value={searchBy}
                                onChange={changeSearchBy}
                            >
                                <FormControlLabel className={classes.groupItem} value="beer_name" control={<Radio />} label="Name" />
                                <FormControlLabel className={classes.groupItem} value="brewed_before" control={<Radio />} label="Brewed before date" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            variant="contained" 
                            color="default" 
                            fullWidth
                            className={classes.button}
                            type="submit"
                        >
                            Search
                            <Search className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <BeerList className={classes.list} beers={ beers } isLoading={ isLoading } />
        </Fragment>
    )
}
