import { JsonDB, Config } from "node-json-db";
import { Static } from "../modules/static";

const USERBASESCHEMA = require("../static/schemas/userbase.json");
const USERSCHEMA = require("../static/schemas/user.json");

class Userbase
{
    static DBPath = Static.Constants.UserbasePath;
    static Instance = new Userbase();

    constructor()
    {
        this.DatabaseSetup();
    }
    async DatabaseSetup()
    {
        this.Database = new JsonDB(new Config(Userbase.DBPath, true, true, '/'));
        await this.Database.push("/", USERBASESCHEMA, false);
    }

    static async GetUser(userID)
    {
        return await Userbase.Instance.Database.getData(`/users[${userID}]`);
    }

    static async CreateUser(userName)
    {
        let userSchema = USERSCHEMA;
        userSchema.userName = userName;
        userSchema.userId = await Userbase.Instance.Database.count("/users");

        await Userbase.Instance.Database.push(`/users[${userSchema.userId}]`, userSchema);
        return userSchema; 
    }

    static async SetUser(user)
    {
        await Userbase.Instance.Database.push(`/users[${user.id}]`, user, true);
    }
}

module.exports = {
    Userbase
}