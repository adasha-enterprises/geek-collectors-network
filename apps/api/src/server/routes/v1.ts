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

    router.get('/user/profile', authenticate, use((req, res) => this.userService.handleGetProfile(req, res)));
    router.patch('/user/profile', authenticate, use((req, res) => this.userService.handleEditProfile(req, res)));

    // User tags
    router.get('/user/tags', authenticate, use((req, res) => this.userService.handleGetUserTags(req, res)));
    router.post('/user/tag', authenticate, use((req, res) => this.userService.handleAddUserTag(req, res)));
    router.delete('/user/tag/:id', authenticate, use((req, res) => this.userService.handleDeleteUserTag(req, res)));

    // Friendships
    router.get('/friendship', authenticate, use((req, res) => this.userService.handleGetFriendslist(req, res)));
    router.get('/friendship/suggestions', authenticate, use((req, res) => this.userService.handleGetFriendSuggestions(req, res)));
    router.get('/friendship/requests', authenticate, use((req, res) => this.userService.handleGetFriendRequests(req, res)));
    router.post('/friendship/:userId', authenticate, use((req, res) => this.userService.handleCreateFriendRequest(req, res)));
    router.patch('/friendship/:userId', authenticate, use((req, res) => this.userService.handleUpdateFriendRequest(req, res)));

    // Item routes
    router.get('/item/feed', authenticate, use((req, res) => this.itemService.handleGetItemFeed(req, res)));
    router.get('/item/:itemId', authenticate, use((req, res) => this.itemService.handleGetItem(req, res)));

    // User Collection Items routes
    router.get('/user/collection', authenticate, use((req, res) => this.itemService.handleGetUserCollection(req, res)));
    router.post('/user/collection', authenticate, use((req, res) => this.itemService.handleAddItemToCollection(req, res)));
    router.delete('/user/collection/:itemId', authenticate, use((req, res) => this.itemService.handleRemoveItemFromCollection(req, res)));

    // User Wishlist Items routes
    router.get('/user/wishlist', authenticate, use((req, res) => this.itemService.handleGetUserWishlist(req, res)));
    router.post('/user/wishlist', authenticate, use((req, res) => this.itemService.handleAddItemToWishlist(req, res)));
    router.delete('/user/wishlist/:itemId', authenticate, use((req, res) => this.itemService.handleRemoveItemFromWishlist(req, res)));

    return router;
  }
}
