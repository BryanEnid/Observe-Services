# Observe-Services

## Start dev

`yarn dev`

## Requirements

- Yarn versions `>=1.22.19 <= 1.22.21`
- Node versions `>= 18.0.0 <= 18.19.0`
- Docker Desktop

## EC2 Instance

Access to an SSH Client and then connect to EC2 Instance with the following command.
Note: You have to provide the cert provided bv AWS "node-express-EC2.pem"

```terminal
  ssh -i "node-express-EC2.pem" ec2-user@ec2-54-160-233-67.compute-1.amazonaws.com
```

## ACT - Testing actions locally

Testing "ubuntu-latest" images

```terminal
act -j <JOB-NAME>
```

Testing "self-hosted" images

```terminal
act -j build -P self-hosted=catthehacker/ubuntu:full-latest
```
