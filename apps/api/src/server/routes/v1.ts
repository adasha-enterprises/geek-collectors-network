import express from 'express';

import { use } from './utils';
import { Resources } from '../services/Service';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

import { authenticate } from '../middleware/Authenticate';

export class Routes {
  private readonly userService: UserService;
  private readonly authService: AuthService;

  constructor(resources: Resources) {
    this.userService = new UserService(resources);
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

    router.get('/user/friends', authenticate, use((req, res) => this.userService.handleGetFriendslist(req, res)));

    return router;
  }
}
