// index.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const obligatoire = require('./routes/obligatoire');
const etudencadrent = require('./routes/etudencadrent');
const depot = require('./routes/depot');
const upload = require('./routes/upload');
const planning = require('./routes/planning');
const emailplanning = require('./routes/emailplanning');
const emaildemandestage = require('./routes/emaildemandestage');
const affectation = require('./routes/affectation');
const emailaffectation = require('./routes/emailaffectation');







const emailUser =require('./routes/emailuser');



dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/emailuser',emailUser);
app.use('/oblg', obligatoire);
app.use('/etudencadrent', etudencadrent);
app.use('/depot', depot);
app.use('/upload', upload);
app.use('/planning', planning);
app.use('/emailplanning', emailplanning);
app.use('/emaildemmandedestage', emaildemandestage);
app.use('/affectation', affectation);
app.use('/emailaffectation', emailaffectation);








app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
