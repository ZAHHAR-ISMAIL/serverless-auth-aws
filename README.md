

### Install Serverless Framwork
```
npm i -g serverless
```

### Configure with aws IAM account
```
serverless config credentials --provider aws --key 1234 --secret 5678 --profile custom-profile
```
Options

    --provider or -p The provider (in this case aws). Required.
    --key or -k The aws_access_key_id. Required.
    --secret or -s The aws_secret_access_key. Required.
    --profile or -n The name of the profile which should be created.
    --overwrite or -o Overwrite the profile if it exists.

### Deploy to aws
```
sls deploy
```