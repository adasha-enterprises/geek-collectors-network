import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';

import type { FriendshipsType, ItemsType, ItemsToTagsType, ItemsToUsersCollectionsType, ItemsToUsersWishlistsType, UsersType, TagsType, UsersToTagsType } from './schema';
// eslint-disable-next-line no-duplicate-imports
import { friendships, items, itemsToTags, itemsToUsersCollections, itemsToUsersWishlists, users, tags, usersToTags } from './schema';

import { logger } from '../modules/logger';

// password: test123
const DUMMY_USERS: UsersType[] = [
  {
    id: 1,
    createdAt: new Date('2024-01-01 00:00:00'),
    updatedAt: new Date('2024-01-02 00:00:00'),
    lastLoginAt: new Date('2024-01-03 00:00:00'),
    email: 'admin@email.com',
    hashedPassword: '4d05fea5d61dc9243dcdad3061c38df4', // "admin"
    salt: '9ed181e3387d23996ba2759537d2b543',
    firstName: 'Ad',
    lastName: 'Amantium',
    displayName: 'ADMIN',
    profileImageUrl: 'https://robohash.org/ADMIN',
    birthDate: new Date('1970-01-01 00:00:00'),
    about: 'I like to admin things.',
  },
  {
    id: 2,
    createdAt: new Date('2023-11-25 10:30:00'),
    updatedAt: new Date('2024-02-28 14:45:00'),
    lastLoginAt: new Date('2024-03-10 9:15:00'),
    email: 'john.doe@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f', // "password"
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'JohhnyD',
    profileImageUrl: 'https://robohash.org/JohhnyD',
    birthDate: new Date('1990-05-15 00:00:00'),
    about: 'I am a male person.',
    twitter: '@johnny_doe',
    facebook: 'john.doe',
    instagram: 'johnny_doe',
  },
  {
    id: 3,
    createdAt: new Date('2022-09-08 08:15:00'),
    updatedAt: new Date('2024-03-05 17:30:00'),
    lastLoginAt: new Date('2024-03-12 10:45:00'),
    email: 'alice.smith@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Alice',
    lastName: 'Smith',
    displayName: 'Alicia',
    profileImageUrl: 'https://robohash.org/Alicia',
    birthDate: new Date('1985-07-21 00:00:00'),
    about: 'I am another generic person.',
    twitter: '@alicia_smith',
  },
  {
    id: 4,
    createdAt: new Date('2023-04-12 14:20:00'),
    updatedAt: new Date('2024-03-09 09:30:00'),
    lastLoginAt: new Date('2024-03-11 11:45:00'),
    email: 'jane.doe@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Jane',
    lastName: 'Doe',
    displayName: 'JaneyD',
    profileImageUrl: 'https://robohash.org/JaneyD',
    birthDate: new Date('1995-10-08 00:00:00'),
    about: 'I am a female person.',
    facebook: 'jane.doe',
  },
  {
    id: 5,
    createdAt: new Date('2023-07-29 11:45:00'),
    updatedAt: new Date('2024-02-18 16:15:00'),
    lastLoginAt: new Date('2024-03-09 14:30:00'),
    email: 'william.shakespeare@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'William',
    lastName: 'Shakespeare',
    displayName: 'The Bard',
    profileImageUrl: 'https://robohash.org/TheBard',
    birthDate: new Date('1564-04-23 00:00:00'),
    about: 'I am a famous playwright.',
    instagram: 'william.shakespeare',
  },
  {
    id: 6,
    createdAt: new Date('2023-12-05 08:30:00'),
    updatedAt: new Date('2024-03-10 13:20:00'),
    lastLoginAt: new Date('2024-03-12 08:45:00'),
    email: 'sherlock.holmes@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Sherlock',
    lastName: 'Holmes',
    displayName: 'Detective Holmes',
    profileImageUrl: 'https://robohash.org/DetectiveHolmes',
    birthDate: new Date('1854-01-06 00:00:00'),
    about: 'I am a fictional detective.',
    twitter: '@detective_holmes',
  },
  {
    id: 7,
    createdAt: new Date('2023-10-10 13:45:00'),
    updatedAt: new Date('2024-03-09 15:35:00'),
    lastLoginAt: new Date('2024-03-11 12:15:00'),
    email: 'bruce.wayne@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Bruce',
    lastName: 'Wayne',
    displayName: 'Batman',
    profileImageUrl: 'https://robohash.org/Batman',
    birthDate: new Date('1939-05-01 00:00:00'),
    about: "I'm Batman.",
    facebook: 'bruce.wayne',
  },
  {
    id: 8,
    createdAt: new Date('2023-03-28 10:20:00'),
    updatedAt: new Date('2024-03-10 13:40:00'),
    lastLoginAt: new Date('2024-03-11 08:55:00'),
    email: 'hermione.granger@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Hermione',
    lastName: 'Granger',
    displayName: 'Witchy',
    profileImageUrl: 'https://robohash.org/Witchy',
    birthDate: new Date('1979-09-19 00:00:00'),
    about: 'I am a witch.',
    instagram: 'hermione.granger',
  },
  {
    id: 9,
    createdAt: new Date('2023-11-05 08:40:00'),
    updatedAt: new Date('2024-03-07 11:15:00'),
    lastLoginAt: new Date('2024-03-10 15:30:00'),
    email: 'peter.parker@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Peter',
    lastName: 'Parker',
    displayName: 'Spider-Man',
    profileImageUrl: 'https://robohash.org/SpiderMan',
    birthDate: new Date('1962-08-10 00:00:00'),
    about: 'I am a friendly neighborhood Spider man.',
    twitter: '@spiderman',
  },
  {
    id: 10,
    createdAt: new Date('2023-09-18 13:20:00'),
    updatedAt: new Date('2024-03-07 10:45:00'),
    lastLoginAt: new Date('2024-03-12 09:30:00'),
    email: 'tony.stark@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Tony',
    lastName: 'Stark',
    displayName: 'Iron Man',
    profileImageUrl: 'https://robohash.org/IronMan',
    birthDate: new Date('1970-05-29 00:00:00'),
    about: "I'm a billionaire playboy philanthropist.",
    facebook: 'tony.stark',
  },
  {
    id: 11,
    createdAt: new Date('2023-10-25 14:10:00'),
    updatedAt: new Date('2024-03-09 12:30:00'),
    lastLoginAt: new Date('2024-03-11 11:20:00'),
    email: 'clark.kent@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Clark',
    lastName: 'Kent',
    displayName: 'Superman',
    profileImageUrl: 'https://robohash.org/Superman',
    birthDate: new Date('1938-04-18 00:00:00'),
    about: 'I am a journalist with a secret identity.',
    instagram: 'clark.kent',
  },
  {
    id: 12,
    createdAt: new Date('2023-11-30 10:50:00'),
    updatedAt: new Date('2024-03-05 15:15:00'),
    lastLoginAt: new Date('2024-03-09 08:40:00'),
    email: 'bruce.banner@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Bruce',
    lastName: 'Banner',
    displayName: 'Hulk',
    profileImageUrl: 'https://robohash.org/Hulk',
    birthDate: new Date('1962-05-01 00:00:00'),
    about: "Don't make me angry. You wouldn't like me when I'm angry.",
    twitter: '@hulk',
  },
  {
    id: 13,
    createdAt: new Date('2023-12-18 09:30:00'),
    updatedAt: new Date('2024-03-10 13:55:00'),
    lastLoginAt: new Date('2024-03-12 10:10:00'),
    email: 'diana.prince@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Diana',
    lastName: 'Prince',
    displayName: 'Wonder Woman',
    profileImageUrl: 'https://robohash.org/WonderWoman',
    birthDate: new Date('1941-10-21 00:00:00'),
    about: 'I am an Amazonian warrior princess.',
    facebook: 'diana.prince',
  },
  {
    id: 14,
    createdAt: new Date('2024-01-07 08:00:00'),
    updatedAt: new Date('2024-03-08 11:25:00'),
    lastLoginAt: new Date('2024-03-10 14:30:00'),
    email: 'thor.odinson@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Thor',
    lastName: 'Odinson',
    displayName: 'God of Thunder',
    profileImageUrl: 'https://robohash.org/GodofThunder',
    birthDate: new Date('1962-08-08 00:00:00'),
    about: 'I am the son of Odin.',
    instagram: 'thor.odinson',
  },
  {
    id: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    email: '',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    birthDate: new Date(),
  },
];

const tagsText: string[] = [
  'Star Wars',
  'Marvel',
  'The Avengers',
  'Iron Man',
  'DC Comics',
  'Batman',
  'Superman',
  'Nintendo',
  'Pokemon',
  'Super Mario Bros',
  'The Legend of Zelda',
  'Transformers',
  'Warhammer 40k',
  'robots',
  'models',
  'action figures',
  'movies',
  'books',
  'comics',
  'video games',
  'board games',
  'LEGO',
  'sci-fi',
  'space',
];

const DUMMY_TAGS: TagsType[] = tagsText.map((text, index) => ({
  id: index + 1,
  creatorId: (index % 3) + 2,
  text,
}));

const DUMMY_USER_TAGS: UsersToTagsType[] = [];
for (let userId = 1; userId <= DUMMY_USERS.length; userId++) {
  for (let i = 0; i < userId; i++) {
    const tagId = ((userId + i) % DUMMY_TAGS.length) + 1;
    DUMMY_USER_TAGS.push({ userId, tagId });
  }
}

const DUMMY_FRIENDSHIPS: FriendshipsType[] = [
  // John Doe sends requests...
  { inviterId: 2, inviteeId: 3, message: 'Hey Alice, let\'s be friends!', status: 'pending' },
  { inviterId: 2, inviteeId: 4, message: 'Hey Jane, let\'s be friends!', status: 'pending' },

  { inviterId: 2, inviteeId: 5, message: 'Hey William, let\'s be friends!', status: 'accepted' },
  { inviterId: 2, inviteeId: 6, message: 'Hey Sherlock, let\'s be friends!', status: 'accepted' },
  { inviterId: 2, inviteeId: 7, message: 'Hey Bruce, let\'s be friends!', status: 'accepted' },

  { inviterId: 2, inviteeId: 8, message: 'Hey Hermione, let\'s be friends!', status: 'rejected' },
  { inviterId: 2, inviteeId: 9, message: 'Hey Peter, let\'s be friends!', status: 'blocked' },

  // John Doe recieves requests...
  { inviterId: 10, inviteeId: 2, message: 'Hey John, it\'s Tony, let\'s be friends!', status: 'pending' },
  { inviterId: 11, inviteeId: 2, message: 'Hey John, it\'s Clark, let\'s be friends!', status: 'pending' },

  { inviterId: 12, inviteeId: 2, message: 'Hey John, it\'s Bruce, let\'s be friends!', status: 'accepted' },
  { inviterId: 13, inviteeId: 2, message: 'Hey John, it\'s Diana, let\'s be friends!', status: 'accepted' },

  { inviterId: 14, inviteeId: 2, message: 'Hey John, it\'s Thor, let\'s be friends!', status: 'rejected' },
  { inviterId: 15, inviteeId: 2, message: 'Hey John, it\'s Hulk, let\'s be friends!', status: 'blocked' },

  // John Doe has 5 current friends total

  // 2 mutual friends with Alice (NOT current friends with John)
  { inviterId: 3, inviteeId: 4, message: '', status: 'accepted' },
  { inviterId: 3, inviteeId: 5, message: '', status: 'accepted' },
  { inviterId: 3, inviteeId: 6, message: '', status: 'accepted' },

  // 3 mutual friends with William (IS current friends with John)
  { inviterId: 5, inviteeId: 6, message: '', status: 'accepted' },
  { inviterId: 5, inviteeId: 7, message: '', status: 'accepted' },
  { inviterId: 5, inviteeId: 12, message: '', status: 'accepted' },

];

const DUMMY_ITEMS: ItemsType[] = [
  {
    'id': 1,
    'creatorId': 1,
    'name': 'Millennium Falcon LEGO Set',
    'description': 'Recreate iconic Star Wars scenes with this detailed LEGO Millennium Falcon set.',
    'url': 'https://www.lego.com/en-us/themes/star-wars',
    'imageUrl': 'https://i.ibb.co/QQhj9V1/lego-millenium-falcon.jpg',
    'company': 'LEGO',
    'price': 199.99,
    'isForSale': true,
    // 'isForTrade': false,
  },
  {
    'id': 2,
    'creatorId': 1,
    'name': 'Iron Man Mark XLIII Action Figure',
    'description': 'Highly detailed Iron Man action figure from Marvel Comics.',
    'url': 'https://www.marvel.com/',
    'imageUrl': 'https://i.ibb.co/VJyXJjJ/iron-man-action-figure.jpg',
    'company': 'Hasbro',
    'price': 29.99,
    'isForSale': true,
    'isForTrade': true,
  },
  {
    'id': 3,
    'creatorId': 1,
    'name': 'Optimus Prime Masterpiece Edition',
    'description': 'Transformers Masterpiece Edition figure of Optimus Prime, leader of the Autobots.',
    'url': 'https://www.transformers.com/',
    'imageUrl': 'https://i.ibb.co/SDTM3jZ/optimus-prime.webp',
    'company': 'Hasbro',
    'price': 99.99,
    'isForSale': true,
    'isForTrade': false,
  },
  {
    'id': 4,
    'creatorId': 1,
    'name': 'Darth Vader Helmet Replica',
    'description': "Authentic replica of Darth Vader's iconic helmet from Star Wars.",
    'url': 'https://www.sideshow.com/',
    'imageUrl': 'https://i.ibb.co/zX4JHYd/darth-vader.jpg',
    'company': 'Sideshow Collectibles',
    'price': 299.99,
    'isForSale': false,
    'isForTrade': false,
  },
  {
    'id': 5,
    'creatorId': 1,
    'name': 'Captain America Shield Prop Replica',
    'description': "Officially licensed replica of Captain America's shield from Marvel Comics.",
    'url': 'https://www.shopdisney.com/',
    'imageUrl': 'https://example.com/captain-america-shield.jpg',
    'company': 'Marvel',
    'price': 199.99,
    'isForSale': true,
    'isForTrade': true,
  },
  {
    'id': 6,
    'creatorId': 1,
    'name': 'Transformers G1 Soundwave Figure',
    'description': 'Vintage Transformers Generation 1 Soundwave action figure.',
    'url': 'https://www.hasbro.com/en-us/brands/transformers',
    'imageUrl': 'https://i.ibb.co/jGXCDS5/shockwave.webp',
    'company': 'Hasbro',
    'price': 49.99,
    'isForSale': true,
    'isForTrade': false,
  },
  {
    'id': 7,
    'creatorId': 1,
    'name': 'Legend of Zelda: Breath of the Wild - Link Nendoroid Figure',
    'description': 'Adorable Nendoroid figure of Link from The Legend of Zelda: Breath of the Wild.',
    'url': 'https://www.goodsmile.info/en/',
    'imageUrl': 'https://i.ibb.co/W2BphpM/link.webp',
    'company': 'Good Smile Company',
    'price': 69.99,
    'isForSale': true,
    'isForTrade': true,
  },
  {
    'id': 8,
    'creatorId': 1,
    'name': 'Samus Aran Figma Action Figure',
    'description': 'Highly articulated Figma action figure of Samus Aran, the iconic bounty hunter from Metroid.',
    'url': 'https://www.goodsmile.info/en/',
    'imageUrl': 'https://i.ibb.co/0hTqKr9/samus.jpg',
    'company': 'Good Smile Company',
    'price': 59.99,
    'isForSale': true,
    'isForTrade': false,
  },
  {
    'id': 9,
    'creatorId': 1,
    'name': 'Warhammer 40,000: Indomitus Box Set',
    'description': 'The ultimate Warhammer 40k starter set featuring Space Marines and Necrons.',
    'url': 'https://www.games-workshop.com/en-US/Warhammer-40000',
    'imageUrl': 'https://i.ibb.co/d4T8BnJ/warhammer-40000-indomitus.jpg',
    'company': 'Games Workshop',
    'price': 199.99,
    'isForSale': true,
    'isForTrade': false,
  },
  {
    'id': 10,
    'creatorId': 1,
    'name': 'Warhammer 40,000: Space Marine Primaris Intercessors Squad',
    'description': 'A set of highly detailed Space Marine Primaris Intercessors for your Warhammer 40k army.',
    'url': 'https://www.games-workshop.com/en-US/Warhammer-40000',
    'imageUrl': 'https://i.ibb.co/Ry1QHK1/warhammer-40k-intercessors.jpg',
    'company': 'Games Workshop',
    'price': 59.99,
    'isForSale': true,
    'isForTrade': true,
  },
];

const DUMMY_ITEMS_TAGS: ItemsToTagsType[] = [
  { itemId: 1, tagId: 1 },
  { itemId: 1, tagId: 15 },
  { itemId: 1, tagId: 22 },
  { itemId: 1, tagId: 23 },
  { itemId: 1, tagId: 24 },

  { itemId: 2, tagId: 2 },
  { itemId: 2, tagId: 3 },
  { itemId: 2, tagId: 4 },
  { itemId: 2, tagId: 16 },

  { itemId: 3, tagId: 12 },
  { itemId: 3, tagId: 54 },
  { itemId: 3, tagId: 16 },

  { itemId: 4, tagId: 1 },
  { itemId: 4, tagId: 17 },
  { itemId: 4, tagId: 23 },

  { itemId: 5, tagId: 2 },
  { itemId: 5, tagId: 3 },
  { itemId: 5, tagId: 19 },

  { itemId: 6, tagId: 12 },
  { itemId: 6, tagId: 14 },
  { itemId: 6, tagId: 16 },

  { itemId: 7, tagId: 8 },
  { itemId: 7, tagId: 11 },
  { itemId: 7, tagId: 15 },
  { itemId: 7, tagId: 20 },

  { itemId: 8, tagId: 8 },
  { itemId: 8, tagId: 11 },
  { itemId: 8, tagId: 15 },
  { itemId: 8, tagId: 20 },
  { itemId: 8, tagId: 23 },

  { itemId: 9, tagId: 13 },
  { itemId: 9, tagId: 15 },
  { itemId: 9, tagId: 23 },

  { itemId: 10, tagId: 13 },
  { itemId: 10, tagId: 15 },
  { itemId: 10, tagId: 24 },
];

const DUMMY_COLLECTION_ITEMS: ItemsToUsersCollectionsType[] = [
  { userId: 2, itemId: 1, notes: 'I love Star Wars!' },
  { userId: 2, itemId: 2 },
  { userId: 2, itemId: 3 },

  { userId: 3, itemId: 7 },
  { userId: 3, itemId: 8, notes: 'She\'s my hero' },
  { userId: 3, itemId: 9 },
  { userId: 3, itemId: 10 },

];

const DUMMY_WISHLIST_ITEMS: ItemsToUsersWishlistsType[] = [
  { userId: 2, itemId: 7 },
  { userId: 2, itemId: 8 },
  { userId: 2, itemId: 9, notes: 'I need some paint for these' },

  { userId: 3, itemId: 1, notes: 'I want this so bad!' },
  { userId: 3, itemId: 2 },
  { userId: 3, itemId: 4 },
  { userId: 3, itemId: 5 },

];

export const writeDummyToDb = async (db: ReturnType<typeof drizzle>) => {
  logger.info('Writing dummy data to database if it doesn\'t exist.');

  // MYSQL doesn't support onConflictDoNothing (i.e. ON DUPLICATE KEY IGNORE)
  // so instead we perform a no-op by setting any column’s value to itself

  const userInsertionPromises = DUMMY_USERS.map(dummy => db
    .insert(users)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    .execute());
  try {
    Promise.all(userInsertionPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const tagPromises = DUMMY_TAGS.map(dummy => db
    .insert(tags)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    .execute());
  try {
    await Promise.all(tagPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const userTagsPromises = DUMMY_USER_TAGS.map(dummy => db
    .insert(usersToTags)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { userId: sql`user_id` } })
    .execute());
  try {
    await Promise.all(userTagsPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const friendshipPromises = DUMMY_FRIENDSHIPS.map(dummy => db
    .insert(friendships)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { inviterId: sql`inviter_id` } })
    .execute());
  try {
    await Promise.all(friendshipPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const itemPromises = DUMMY_ITEMS.map(dummy => db
    .insert(items)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    .execute());
  try {
    await Promise.all(itemPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const itemTagPromises = DUMMY_ITEMS_TAGS.map(dummy => db
    .insert(itemsToTags)
    .values(dummy)
    // .onDuplicateKeyUpdate({ set: { itemId: sql`item_id` } })
    .execute());
  try {
    await Promise.all(itemTagPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }


  const collectionItemPromises = DUMMY_COLLECTION_ITEMS.map(dummy => db
    .insert(itemsToUsersCollections)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { itemId: sql`item_id` } })
    .execute());
  try {
    await Promise.all(collectionItemPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const wishlistItemPromises = DUMMY_WISHLIST_ITEMS.map(dummy => db
    .insert(itemsToUsersWishlists)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { itemId: sql`item_id` } })
    .execute());
  try {
    await Promise.all(wishlistItemPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }
};
