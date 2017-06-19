# Bark

## Description
Bark is a Tinder like application that allows pet owners to place their pets that need to be adopted on this website.
A user looking to adopt can swipe through pictures of the available pets and message the owner.

## To start
```
yarn install
createdb bark
yarn seed
create a secrets.js with keys for:
 * process.env.GOOGLE_CLIENT_ID
 * process.env.GOOGLE_CLIENT_SECRET
 * process.env.GOOGLE_CALLBACK
yarn start-dev
```

Check it out on http://localhost:2407/
