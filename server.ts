import app from "./app";

const port: string | number = 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
