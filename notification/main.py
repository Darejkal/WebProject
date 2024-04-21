import apprise
from fastapi import FastAPI
from fastapi import FastAPI,status
from pydantic import BaseModel
import datetime
import uvicorn
class MailTo(BaseModel):
    emailto:str 
    title:str
    body:str
app = FastAPI()

@app.post("/send_mail/",status_code=status.HTTP_200_OK)
async def send_email(item:MailTo):
    apobj = apprise.Apprise()
    # Add at least one service you want to notify
    apobj.add(
        f'mailto://gmail.com?\
            user=iot.team12@gmail.com\
            &pass=qlkkyqpjbrdbeekh\
            &from=iot.team12@gmail.com\
            &to={item.emailto}\
                ')

    # Then send your attachment.
    apobj.notify(
        title=item.title,
        body=item.body,
    )
    return {
        "createat":datetime.datetime.now()
    }
if __name__=="__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5050, reload=True)