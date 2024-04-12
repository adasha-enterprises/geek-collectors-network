# Project Release Notes

## About this release

The Geek Collectors Network (GCN) is an online social platform specifically for collectors of geek culture, ranging from toys and action figures to memorabilia from popular franchises like Pokemon, Marvel, DC, and Disney. GCN will allow users to connect with fellow enthusiasts, curate and manage wishlists of sought-after items, and showcase their personal collections. A unique feature of GCN is the ability for users to share discoveries from unique or lesser-known shops with their network.

## Current Features

### User Authentication

- Create a new account by entering first name, last name, email, and password

- Login with email and password
- Logout

### User Profile

- Profile created when a user signs up for an account
- Edit account details including email, DOB, Country, Province/State, City, About, and Interests
- Users can edit and save profile details, then see the public-facing profile page
- User profile avatar uses image at url

### Networking

- View a list of current friends
- Filter friends by entering name in search bar
- View a list of recommended friends

- User Card had buttons to send request
- Send request modal has optional request message

- View a list of pending friend requests

- User Card has buttons to accept or deny requests

- Email button opens email client with template email

### Collectible Items Management

- See the item feed (landing page) that shows items most recently added to GCN
- Click on the item card to open the modal that displays more item details

- Larger Image
- Description
- External link to the item (e.g. in an online store)
- Item tags

- Add items to personal Collection or Wishlist
- View Collection or Wishlist Items pages
- Remove Items from the Collection or Wishlist

## Known Bugs, Issues and Limitations

### Landing Page

- The logo not rendered correctly
- Not redirect to the Item Feed if a user is logged in

### Sign Up Page

- Password only checked for minimum 8 characters length
- Unable to sign up without both first name and last name

### Login Page

- No password recovery
- No “Remember me” function

### Home Page (Item Feed)

- Currently gets all items not in the user’s collection or wishlist
- No filtering method, e.g. prefer showing items
- Hide Item button functionality not implemented
- Adding an item to the Collection/Wishlist gives no user feedback and the item remains on the page
- Not connected with the Geek Gift Registry items database
- Many item fields are not displayed in the Item Card or info modal

### User Profile Page

- Cannot edit profile image url
- “About” section changes do not persist

### Account Page

- User cannot change their password

### Friends Page

- Displayed users are dummy data pulled from another site, not the database
- Messaging button, the right button, does nothing

### Networking Page

- Pending Friend Request tab

- Users are dummy data pulled from another site, not the database
- Accepting or denying friend requests has no functionality

- Friend Suggestions tab

- Accepting a Pending Friend Request does not add them to the Friends list

### Collection Page

- Create New Item not implemented
- Share Collection with user not implemented

### Wishlist Page

- Missing Add To Collection button (i.e. when item is obtained)
- Share Wishlist with user not implemented

---

# Deployment Notes

## Installation Requirements

- Operating System: Ubuntu 20.04+

- Node v18+
- Docker Engine v26+ (Depends if you are self-hosting the database)

# Configurations

Copy the example environment file `./apps/api/.env.example` and paste it inside `./apps/api/.env`

You’ll find pre-set environment variables.

|                   |                                                                                 |         |
| ----------------- | ------------------------------------------------------------------------------- | ------- |
| VARIABLE          | DESCRIPTION                                                                     | DEFAULT |
| API_HOST          | The address to bind the application to                                          | 0.0.0.0 |
| API_PORT          | The address to bind the port to                                                 | 3000    |
| DATABASE_HOST     | The IPv4 address or hostname of the database                                    |         |
| DATABASE_PORT     | The port to your MySQL database                                                 | 3306    |
| DATABASE_USER     | The name of a user with read-write access to the GeekCollectorsNetwork database | root    |
| DATABASE_PASSWORD | The password for the database user                                              |         |
| DATABASE_NAME     | The name of the database to store application information                       |         |
| WEB_ROOT          | A relative file path to the built frontend files                                |         |

|

# App Deployment Instructions

You’ll need to install all dependencies to build and run the app:

```
npm install -ws
```

## Frontend

Once dependencies are installed, you must now build the frontend:

```
npm run build
```

## Database

If you are using a remote MySQL server, fill in the database configuration in the `./apps/api/.env` file.

In the remote database, you have to create the GeekCollectorsNetwork and SessionStore databases, you can find the commands in `./docker/mysql/initdb/init.sq`.

OTHERWISE if you want to locally host your database, use the pre-set database configuration and run:

```
docker compose -p geek-collectors-network -f ./docker-compose.yml up -d mysql-resource
```

## Application 

Start the application using:

```
npm run -w apps/api start
```

# Final Code

[https://github.com/Geek-Collectors-Network/geek-collectors-network](https://github.com/Geek-Collectors-Network/geek-collectors-network)
