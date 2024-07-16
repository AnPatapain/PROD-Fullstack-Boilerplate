import express from "express";
import sampleRouter from './router/Sample.router';
const app = express();

app.use('/api', sampleRouter);

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
