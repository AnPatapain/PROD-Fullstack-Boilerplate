import express from 'express';
const app = express();

app.get('/api', (req: express.Request, res: express.Response) => {
    res.json({message: 'helloworld'})
})

app.listen(8080, () => {
    console.log('Listenning on port 8080');
});
