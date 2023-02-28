import './style.css'
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';

const REGION = "us-east-1";
const IDENTITY_POOL_ID = "us-east-1:xxxx";

const ebClient = new EventBridgeClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID
  })
});

const app = document.querySelector<HTMLDivElement>("#app")!


app.innerHTML = `
  <h1>Calling EventBridge from Web using Cognito Identity Pool unauthenticated identity.</h1>
  <button id="sendButton">Send Event</button>
  `;

const button = document.getElementById("sendButton");
if (button) {
  button.addEventListener("click", async () => {
    await sendEvent();
  });
}

async function sendEvent() {
  const events = {
    Entries: [
      {
        DetailType: "SubmitOrder",
        Detail: JSON.stringify({
          "orderId": "abc"
        }),
        Source: "com.org.app1",
      },
    ],
  };

  try {
    const data = await ebClient.send(new PutEventsCommand(events));
    console.log("Success, event sent; requestID:", data);
  } catch (err) {
    console.log("Error", err);
  }
}

