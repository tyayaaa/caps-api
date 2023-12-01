const express = require('express')
const verifyToken = require('../config/verifyToken')
const {signUp, signIn} = require('../controller/authCon')
const {place, placeByName, detailPlace, popularPlace} = require('../controller/placeCon')

const route = express.Router()
//=================================================================================================================
route.post('/signup', signUp)
route.post('/signin', signIn)
//route.post('/signout', signOut)

//nanti tambahin verify token
route.get('/place', place)
route.get('/search/:place_name', placeByName)
route.get('/place/:place_id', detailPlace)
route.get('/popular', popularPlace)

module.exports = route;