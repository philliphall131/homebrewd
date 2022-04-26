# import os.path
import os
from dotenv import load_dotenv
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.mime.text import MIMEText
import base64

load_dotenv()
DEBUG = (os.getenv("DEBUG") == "true")

def notify(user_email, message_id, beer_name='none', optional_msg=''):
    """
    message_id: 1 is 25% remaining, 2 is empty, 3 is reset password
    """
    SCOPES = ['https://www.googleapis.com/auth/gmail.send']
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        # Call the Gmail API
        service = build('gmail', 'v1', credentials=creds)
        if message_id == 1:
            email_content = MIMEText(f'Your keg of {beer_name} has less than a quarter remaining, time to brew a new batch!')
            email_content['subject']=f'HomeBrewd Notification: {beer_name} Low'
        elif message_id == 2: 
            email_content = MIMEText(f'Your keg of {beer_name} is empty, time to replace it with a fresh brew!')
            email_content['subject']=f'HomeBrewd Notification: {beer_name} Empty'
        elif message_id == 3: 
            email_content = MIMEText(f'Your temporary Homebrewd password is: {optional_msg}')
            email_content['subject']=f'HomeBrewd Password Reset'
        if DEBUG:
            email_content['to']=os.getenv('EMAIL') #production sub in user_email
        else: 
            email_content['to']=user_email
        email_content['from']='HomeBrewd'
        email_build = {'raw':base64.urlsafe_b64encode(email_content.as_string().encode('utf-8')).decode('utf-8')}

        e_mail = (service.users().messages().send(userId='homebrewd.menus@gmail.com', body=email_build).execute())
        return True
    
    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f'An error occurred: {error}')