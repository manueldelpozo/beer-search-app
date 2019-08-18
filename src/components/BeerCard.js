import React, { Fragment, useState, useCallback, useEffect } from 'react'
import fetchBeers from '../api/fetchBeers.js'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
    card: {
        maxWidth: '100%',
        minHeight: 400,
        padding: 20
    },
    cardContent: {
        minHeight: 350,
    },
    name: {
        margin: 20
    },
    description: {
        marginBottom: 20
    },
    progress: {
        margin: 40,
    },
})

export default function BeerCard() {
    const classes = useStyles()
    const [beer, setBeer] = useState({
        id: 0,
        image_url: '',
        name: '',
        description: '',
        abv: 0
    })
    const [isNonAlcoholic, setIsNonAlcoholic] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const fetchRandomBeer = () => {
        setIsLoading(true)
        fetchBeers(isNonAlcoholic ? '?abv_lt=0.6' : '/random').then(response => {
            const count = Object.keys(response).length
            const anotherBeer = response[Math.floor(Math.random() * count - 1) + 1]

            if (!anotherBeer.image_url || !anotherBeer.name || !anotherBeer.description || anotherBeer.id === beer.id) {
                fetchRandomBeer()
            }
            setBeer(anotherBeer)
        }).catch((error) => {
            console.error(error)
        })
        setIsLoading(false)
    }

    useEffect(() => {
        fetchRandomBeer()
    }, [isNonAlcoholic])

    const fetchAlcoholicBeer = useCallback(() => {
        if (!isNonAlcoholic) {
            fetchRandomBeer()
        }
        setIsNonAlcoholic(false)
    }, [isNonAlcoholic, beer])

    const fetchNonAlcoholicBeer = useCallback(() => {
        if (isNonAlcoholic) {
            fetchRandomBeer()
        }
        setIsNonAlcoholic(true)
    }, [isNonAlcoholic, beer])

    return (
    <Card className={classes.card}> 
        <CardContent className={classes.cardContent}>
            {isLoading ?
            <CircularProgress className={classes.progress} /> :
            <Fragment>
                <img
                    height="140"
                    src={ beer.image_url }
                    alt={ beer.name }
                />
                <Typography gutterBottom variant="h5" component="h2" className={ classes.name }>
                    { beer.name }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={ classes.description }>
                    { beer.description }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="strong">
                    ABV: { beer.abv } %
                </Typography>
            </Fragment>
            }
        </CardContent>
        <CardActions>
            <Button 
                variant="outlined"
                color="primary"
                onClick={ fetchAlcoholicBeer }
                >
                Show me another beer
            </Button>
            <Button 
                variant="outlined"
                color="secondary"
                onClick={ fetchNonAlcoholicBeer }
                >
                Show me another non-alcoholic beer
            </Button>
        </CardActions>
    </Card>
  )
}