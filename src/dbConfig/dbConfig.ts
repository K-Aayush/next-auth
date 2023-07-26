import mongoose from "mongoose";

export async function Connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('mongodb connected sucessfully')
        })

        connection.on('error', (err) => {
            console.log('mongodo connection error', err);
            process.exit();
        })
    } catch (error) {
        console.log("Opps something went wrong");
        console.log(error)
    }
}