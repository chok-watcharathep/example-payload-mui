## MHESI

A Next.js and Payload CMS-based web application for MHESI (Ministry of Higher Education, Science, Research and Innovation) Credit Port management system.

### Tech Stack

- [Payload CMS](https://payloadcms.com/)
- [Next.js](https://nextjs.org/)
- [MUI](https://mui.com/)

### Installation

1.  First clone the repository if you have not done so already
2.  Go to project folder
    ```
    cd mhesi-credit-port-portal
    ```
3.  Copy the example environment variables.

    ```
    cp .env.example .env
    ```

4.  Update the `DATABASE_URI` in your new `.env` file to connect to the PostgreSQL database running in Docker. The URI should look something like this:
    ```
    DATABASE_URI="postgresql://my_user:my_password@localhost:5432/my_database"
    ```
5.  Start the PostgreSQL database with Docker: `docker-compose up -d`. This will run the database in the background.
6.  Install dependencies and start the dev server

    ```
    pnpm install && pnpm dev
    ```

7.  open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

### Database Migrations

When you make changes to a collection (e.g., adding a new field or a new collection), you must generate a new database migration file to apply those changes to your database. This is a crucial step for both local development and deployment.

- To **generate** a new migration, run `pnpm migrate:create <migration-name>`.
  - Replace `<migration-name>` with a descriptive name for your change (e.g., `add-products-collection` or `update-user-fields`).
  - This command will create a new migration file in the `src/migrations` folder.
- The new migration is automatically applied in **development mode**.
- For **deployment**, you must run `pnpm migrate` to apply all pending migrations.

### How it works

This setup uses `pnpm` for the application and `Docker` to manage the database. This approach helps standardize the development environment

- **Application:** The Payload app is running on your machine directly, which can make things like debugging and file changes faster.
- **Database:** The database runs in a container, isolating it from your local machine's environment and preventing conflicts.

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.
