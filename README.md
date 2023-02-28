# Web-EventBridge-Cognito Sample

## AWS
1. Create an Amazon Cognito Identity Pool
2. For the [unauthenticated user](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html#authenticated-and-unauthenticated-identities), grant the following permissions

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": "events:PutEvents",
                "Resource": "arn:aws:events:us-east-1:xxxx:event-bus/default"
            }
        ]
    }
    ```

3. Set `IDENTITY_POOL_ID` in [main.ts](./src/main.ts) to the `Identity pool ID` value generated when the Cognito Identity Pool was created. Make sure to check `Enable access to unauthenticated identities`


## Web

1. Execute `npm install`
2. Run `npm run dev`

## Error

The browser dev tools will show the following error when the button in clicked:

```
Error AccessDeniedException: User: arn:aws:sts::xxxx:assumed-role/Cognito_XXXidentitypoolUnauth_Role/CognitoIdentityCredentials is not authorized to perform: events:PutEvents on resource: arn:aws:events:us-east-1:xxxx:event-bus/default because no session policy allows the events:PutEvents action
```
