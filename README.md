# Resuilder

Resuilder is a web-based tool designed to create stunning and professional resumes specifically tailored for programmers. With its user-friendly interface and customizable templates, Resuilder empowers developers to showcase their skills and experiences in an appealing and impactful way.

## ⚠️ Disclaimer and Warning

**Resuilder is currently in active development and may undergo frequent changes. The codebase has not undergone extensive testing, and as a result, it may contain bugs or errors. Use it at your own discretion and be cautious when relying on it for critical applications.**

We welcome contributions from the community to help improve the tool's stability and reliability. Feel free to report issues and contribute to the project.

## Requirements

To run Resuilder locally, you need the following:

- Git
- Docker Compose (version 19.03.0+)
- Cloudinary account
- Auth0 account

## Running the Application

### Development Environment (docker-compose.dev.yaml)

Before running the application in the development environment, make sure you have configured the necessary environment variables by creating a `.env` file in the respective app directories (`mongo`, `generator/app`, `backend/app`, `frontend/app`) based on the provided `.env.sample` files.

You can find example `.env` files in the following locations:

- `mongo/.env.sample`
- `generator/app/.env.sample`
- `backend/app/.env.sample`
- `frontend/app/.env.sample`

1. Clone this repository: `git clone https://github.com/luovkle/resuilder`
2. Navigate to the project directory: `cd resuilder`
3. Copy and rename the `.env.sample` files to `.env` in each app directory, and set the required values.
4. Run the following command to start the development environment:

```sh
docker compose -f docker-compose.dev.yaml up -d --build
```

Access Resuilder frontend in your web browser at: [http://localhost:3000](http://localhost:3000)

### Production Environment (docker-compose.prod.yaml)

Before running the application in the production environment, ensure you have the required environment variables set in your production environment.

1. Clone this repository: `git clone https://github.com/luovkle/resuilder`
2. Navigate to the project directory: `cd resuilder`
3. Configure environment variables in your production environment based on the examples in .env.sample files.
   - `DB_URI`: MongoDB connection URI
   - `ALLOW_ORIGINS`, `DOMAIN`, `API_AUDIENCE`, `ISSUER`, `ALGORITHMS`, `CLOUDINARY_URL`: Backend configuration variables
   - `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE`: Frontend configuration variables
4. Run the following command to start the production environment:

```sh
docker compose -f docker-compose.prod.yaml up -d --build
```

Access Resuilder frontend in your web browser at: [http://localhost](http://localhost)

Remember to keep your environment variables secure and properly managed in production for security and stability reasons.

## Contributing

We welcome contributions from the community to help enhance Resuilder. If you encounter issues or have feature suggestions, please feel free to submit a pull request or open an issue on the GitHub repository.rusername" with your actual GitHub username in the provided instructions.
