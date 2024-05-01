const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")

const axios = require('axios');
const router = express.Router();

// Define a route to fetch tracks from Spotify API
router.get('/tracks', async (req, res) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/tracks', {
            headers: {
                'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
            }
        });
        const tracks = response.data;
        res.json(tracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;



// const dburl="mongodb://localhost:27017/sdpproject32"
// mongoose.connect(dburl).then((result) => {
//     console.log("Connected to DB Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });


const dburl = "mongodb+srv://klu:klu@cluster0.0ksy9.mongodb.net/sdpproject32?retryWrites=true&w=majority"
mongoose.connect(dburl).then(() => {
      console.log("Connected to MongoDB Atlas Successfully")
}).catch((err) => {
     console.log(err.message)
});


const app = express ()
app.use(express.json()) //to parse JSON data
app.use(cors())


const adminrouter = require("./routes/adminroutes")
const userrouter = require("./routes/userroutes")

app.use("",adminrouter) // it include admin route
app.use("",userrouter) // it include user route


const port=2025
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})