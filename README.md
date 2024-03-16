# Event Ticketing System (ETS)

This is a Next.js app for buying event tickets. The app allow event organisers to create events. Users can buy tickets for these events. The tickets can be scanned by event organisers to consume it.

## Production setup

TBA

## Development setup

### Prerequsites

-   You must have [Node.js](https://nodejs.org/en) installed. vesion 21.3.0 was used during development.
-   To avoid having to install and setup all the external services for this app (such as PostgreSQL and RabbitMQ). Install [docker](https://docs.docker.com/get-docker/) and follow the steps in the next section.

Clone the repository

```bash
git clone https://github.com/Moorad/event-ticketing-system
```

### External services

This app requires the following services to be setup:

-   PostgreSQL
-   RabbitMQ
-   Redis
-   MinIO

You may install these service manually if you wish.

Alternatively, using docker:

Navigate to `/docker`

```bash
cd /docker
```

Run the compose file

```bash
sudo docker compose up
```

### Installing depedencies and running the app

When installing node, npm will automatically be installed. In the root of the project run

```bash
npm install
```

Once dependencies are installed, create a new file in the root named `.env` with the following information:

```
DATABASE_URL="postgresql://<database url>"
RABBITMQ_URL="amqp://<rabbitmq url>"
REDIS_URL="redis://<redis url>"
MINIO_URL="<minio url without port or leading http://>"
MINIO_ACCESS_KEY="<minio access key>"
MINIO_SECRET_KEY="<minio secret key>"
NEXTAUTH_SECRET="<random string>"
NEXTAUTH_URL="http://localhost:3000/api/auth"
```

You can alternatively define these values as environment variables in your system.

If you have used docker to setup and run the external services you may use the below information

```
DATABASE_URL="postgresql://root:root@localhost:5432/ets-db"
RABBITMQ_URL="amqp://root:root@localhost:5672"
REDIS_URL="redis://localhost:6379"
MINIO_URL="localhost"
MINIO_ACCESS_KEY="<minio access key>"
MINIO_SECRET_KEY="<minio secret key>"
NEXTAUTH_SECRET="<random string>"
NEXTAUTH_URL="http://localhost:3000/api/auth"
```

For the `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` you can obtain these keys by going to [http://localhost:9001](http://localhost:9001), logging in with the username `root` and password `rootpassword` and going to `Access Keys` -> `Create access keys`, copying the `Access Key` and `Secret Key` and clicking `Create`.

As for the `NEXTAUTH_SECRET` you can use any random string but using the following command to generate a random 32 character string is recommeneded

```bash
openssl rand -base64 32
```

Lastly, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful links

Here are some links for some of the design and management of the project that were used during development

-   [Figma - UI Design Mock ups](https://www.figma.com/file/dBOxfoVfSeBGQo5EsVpHhz/ETS-Design?type=design&node-id=0%3A1&mode=design&t=ZHxCjN4ErImJzomh-1)
-   [FigJam - Project Planning and Brainstorming](https://www.figma.com/file/U5VCgsqe5JqWXEAR00S5MB/ETS-Plan?type=whiteboard&t=WBNX2vyShnRtiPbL-1)
-   [Trello - Project and Task Management](https://trello.com/b/4P6ionZP/ets-board)
