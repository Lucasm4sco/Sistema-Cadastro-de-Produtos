import express from 'express';
import router from './routes/route.js';
import bodyParser from 'body-parser';

  
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use(bodyParser.urlencoded({extended:true})); 

app.set('view engine', 'ejs');

app.use(express.static("public"));
  
app.listen(PORT);   
 
app.use('/', router)  

app.use('/categorias', router)
 
app.use('/produtos', router) 


 