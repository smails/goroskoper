const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config/config')
const app = express()
const mongodb = require('mongodb').MongoClient
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || config.port,
	() => console.log(`Server start on port ${config.port} ...`))

mongodb.connect("mongodb://127.0.0.1:27017", function (err, dbo) {
	if (err) throw err;

	dbo.db("test").collection("posts").find({}).toArray(function (err, data) {
		if (err) throw err;

		app.get('/posts', (req, res) => {
			res.send(data)
		})
	});

});