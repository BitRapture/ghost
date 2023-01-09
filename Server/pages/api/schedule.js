import { Userbase } from "../../src/ghost/userbase";

async function Schedule(req, res)
{
    let userDetails = await Userbase.CreateUser(new Date());

    res.status(200).json(userDetails);
}

export default Schedule;