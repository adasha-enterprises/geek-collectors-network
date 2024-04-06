import express from 'express';

import { use } from './utils';
import { Resources } from '../services/Service';
import { UserService } from '../services/UserService';
import { ItemService } from '../services/ItemService';
import { AuthService } from '../services/AuthService';

import { authenticate } from '../middleware/Authenticate';

export class Routes {
  private readonly userService: UserService;
  private readonly itemService: ItemService;
  private readonly authService: AuthService;

  constructor(resources: Resources) {
    this.userService = new UserService(resources);
    this.itemService = new ItemService(resources);
    this.authService = new AuthService(resources);
  }

  public create() {
    const router = express.Router();

    // Authorization
    router.post('/auth/signup', use((req, res) => this.authService.handleSignUp(req, res)));
    router.post('/auth/login', use((req, res) => this.authService.handleLogin(req, res)));
    router.post('/auth/logout', use((req, res) => this.authService.handleLogout(req, res)));

    router.get('/user/:userId?/profile', authenticate, use((req, res) => this.userService.handleGetProfile(req, res)));
    router.patch('/user/profile', authenticate, use((req, res) => this.userService.handleEditProfile(req, res)));

    // User tags
    router.get('/user/:userId?/tags', authenticate, use((req, res) => this.userService.handleGetUserTags(req, res)));
    router.post('/user/tag/:tagId?', authenticate, use((req, res) => this.userService.handleAddUserTag(req, res)));
    router.delete('/user/tag/:tagId', authenticate, use((req, res) => this.userService.handleDeleteUserTag(req, res)));

    // Friendships
    router.get('/friendship', authenticate, use((req, res) => this.userService.handleGetFriendslist(req, res)));
    router.get('/friendship/suggestions', authenticate, use((req, res) => this.userService.handleGetFriendSuggestions(req, res)));
    router.get('/friendship/requests', authenticate, use((req, res) => this.userService.handleGetFriendRequests(req, res)));
    router.post('/friendship/:userId', authenticate, use((req, res) => this.userService.handleCreateFriendRequest(req, res)));
    router.patch('/friendship/:userId', authenticate, use((req, res) => this.userService.handleUpdateFriendRequest(req, res)));

    // Item routes

    router.get('/item/feed', authenticate, use((req, res) => this.itemService.handleGetItemFeed(req, res)));

    // search for items
    // router.get('/items', authenticate, use((req, res) => this.itemService.handleSearchItems(req, res)));

    // item crud operations
    // router.post('/item/', authenticate, use((req, res) => this.itemService.handleCreateItem(req, res)));
    router.get('/item/:itemId', authenticate, use((req, res) => this.itemService.handleGetItem(req, res)));
    // router.patch('/item/:itemId', authenticate, use((req, res) => this.itemService.handleUpdateItem(req, res)));
    // router.delete('/item/:itemId', authenticate, use((req, res) => this.itemService.handleDeleteItem(req, res)));
    // item tags
    // router.post('/item/:itemId/:tagId?', authenticate, use((req, res) => this.itemService.handleAddItemTag(req, res)));
    // router.delete('/item/:itemId/:tagId', authenticate, use((req, res) => this.itemService.handleRemoveItemTag(req, res)));

    // User Collection Items routes
    router.get('/user/:userId?/collection', authenticate, use((req, res) => this.itemService.handleGetUserCollection(req, res)));

    // User Wishlist Items routes
    router.get('/user/:userId?/wishlist', authenticate, use((req, res) => this.itemService.handleGetUserWishlist(req, res)));

    return router;
  }
}
