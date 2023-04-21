# PetHub REST API

## About

This is the REST API for an pet adoption web application. 

In this repository you can find the backend REST API (which is built in **Express** + **Mongo DB**).

## Alert

- This repository only contains the **BACKEND** code of the whole PetHub project!
- To check the **FRONTEND** repository, CLICK [HERE](https://github.com/PetHub-MERN/pethub-client)!

## Instructions

To run this code on you computer, follow the next steps:

- Fork and clone!
- Install the necessary dependencies running: `npm install`
- Create a `.env` file with the following environments variables:
  - `PORT`, with the location of the port that your backend will use in localhost (example, `PORT=5000`). This one is optional but recommended.

  - `ORIGIN`, with the location of your frontend app (example, `ORIGIN=http://supercoolfrontapp.netlify.com` or if working on localhost `ORIGIN=http://localhost:3000`).

  - `TOKEN_SECRET`, this is used to sign in authorization with JWT (example, `TOKEN_SECRET=s3cr3tp4ssw0rd`).

  - `CLOUDINARY_NAME, CLOUDINARY_KEY` and `CLOUDINARY_SECRET`, this are the credentials of your Cloudinary service. You can find them on you Cloudinary dashboard.

## API Endpoints

### Auth Endpoints
You can find this in `/routes/auth.routes.js`.

| HTTP verb | Path             | Request Headers                   | Request body                                      | Description         |
|-----------|------------------|-----------------------------------|---------------------------------------------------|---------------------|
| POST      | /api/auth/signup | –                                 | { name: String, email: String, password: String } | Create an account   |
| POST      | /api/auth/login  | –                                 | { email: String, password: String }               | Login               |
| GET       | /api/auth/verify | Authorization: Bearer `<JWT>`       | –                                                 | Verify JWT          |

### Profile Endpoints
| HTTP verb | Path               | Request Headers                   | Request body                                      | Description         |
|-----------|--------------------|-----------------------------------|---------------------------------------------------|---------------------|
| GET       | /api/users/:userId | Authorization: Bearer `<JWT>`       | -                                                 | Get a user          |
| PUT       | /api/users/:userId | Authorization: Bearer `<JWT>`       | { imageUrl: String }                              | Edit user profile   |

### Cloudinary Endpoints
You can find this in `/routes/index.routes.js`.

### Profile Endpoints
You can find this in `/routes/profile.routes.js`.

| HTTP verb | Path               | Request Headers                   | Request body                                      | Description                       |
|-----------|--------------------|-----------------------------------|---------------------------------------------------|-----------------------------------|
| POST      | /api/upload        | -                                 | -                                                 | Upload pic to Cloudinary          |

### Pet Endpoints
You can find this in `/routes/pet.routes.js`.

| HTTP verb | Path               | Request Headers                   | Request body                                                                                                                       | Description         |
|-----------|--------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| POST      | /api/pets          | Authorization: Bearer `<JWT>`       | { name: String, dateOfBirth: Date, species: Array[String], breed: String, description: String, imageUrl: String, owner: ObjectId } | Create a pet        |
| GET       | /api/pets          | -                                 | -                                                                                                                                  | Get all pets        |
| GET       | /api/pets/:petId   | Authorization: Bearer `<JWT>`       | -                                                                                                                                  | Get specific pet    |
| PUT       | /api/pets/:petId   | Authorization: Bearer `<JWT>`       | { name: String, species: String, breed: String, description: String, imageUrl: String }                                            | Update specific pet |
| DELETE    | /api/pets/:petId   | Authorization: Bearer `<JWT>`       | -                                                                                                                                  | Delete a pet        |

### Adoption Endpoints
You can find this in `/routes/adoption.routes.js`.

| HTTP verb | Path                         | Request Headers                   | Request body                                                                                               | Description              |
|-----------|------------------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------|--------------------------|
| POST      | /api/adoptions               | Authorization: Bearer `<JWT>`       | { title: String, location: String, description: String, pets: Array[ObjectId], imageUrl: String }          | Create an adoption       |
| GET       | /api/adoptions               | -                                 | -                                                                                                          | Get all adoptions        |
| GET       | /api/adoptions/:adoptionId   | Authorization: Bearer `<JWT>`       | -                                                                                                          | Get specific adoption    |
| PUT       | /api/adoptions/:adoptionId   | Authorization: Bearer `<JWT>`       | { title: String, location: String, description: String, pets: Array[ObjectId], imageUrl: String }          | Update specific adoption |
| DELETE    | /api/pets/:petId             | Authorization: Bearer `<JWT>`       | -                                                                                                          | Delete an adoption       |

## Demo!

A demo of the backend API can be found in this link: [PetHub REST API](https://pethub-api.adaptable.app/)

---

## Contact Us!

If you need anything you can find us on LinkedIn:

- [Cristian Palao](https://www.linkedin.com/in/cristian-pc/)
- [Ismael Freitas](https://www.linkedin.com/in/ismael-freitas-6366891b8/)

Thanks for reading and happy hacking! 😌