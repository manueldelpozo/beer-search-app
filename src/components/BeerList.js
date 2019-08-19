import React, { Fragment, useState, useEffect, useRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    progress: {
        margin: 40,
    },
}))

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const BeerList = ({beers, isLoading}) => {
    const classes = useStyles()
    const [selectedBeerId, setSelectedBeerId] = useState(0)
    const myRef = useRef(null)
    
    useEffect(() => {
        if (beers.length > 0) {
            scrollToRef(myRef)
        }
    }, [beers])

    const onSelectBeer = (event, id) => {
        setSelectedBeerId(id)
    }

    return (
        <List className={classes.root} data-testid="beer-list" ref={myRef}>
            {isLoading ?
            <CircularProgress className={classes.progress} /> :
            beers.map(beer =>
            <ListItem
                id={beer.id}
                key={beer.id}
                alignItems="flex-start"
                button
                selected={selectedBeerId === beer.id}
                onClick={event => onSelectBeer(event, beer.id)}
            >
                <ListItemAvatar>
                    <Avatar alt={ beer.name } src={ beer.image_url } />
                </ListItemAvatar>
                <ListItemText
                    primary={ beer.name }
                    secondary={
                    <Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                        { beer.tagline } (First Brewed in { beer.first_brewed }) :
                        </Typography>
                        { beer.description }
                    </Fragment>
                    }
                />
                <Divider variant="inset" component="li" />
            </ListItem>
            )}
        </List>
    );
}

export default BeerList
