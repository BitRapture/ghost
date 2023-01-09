import { Static } from "../modules/static";

class Logger 
{
    static LogPrefix = Static.Constants.LogPrefix;

    static Log(message, color="")
    {
        let dateTime = new Date();
        let dateHours = dateTime.getHours().toString().padStart(2, '0');
        let dateMinutes = dateTime.getMinutes().toString().padStart(2, '0');
        let dateSeconds = dateTime.getSeconds().toString().padStart(2, '0');

        console.log(`${color}${dateHours}:${dateMinutes}:${dateSeconds} :: ${Logger.LogPrefix}${message}`);
    }

    static Error(message)
    {
        Logger.Log(`${message} [ERROR!]`, "\x1b[31m");
    }

    static Throw(message)
    {
        Logger.Error(message);
        throw "Exception caught";
    }

    static Try(event)
    {
        try
        {
            return event();
        }
        catch (e)
        {
            Logger.Throw(e);
        }
    }
}

module.exports = {
    Logger
}