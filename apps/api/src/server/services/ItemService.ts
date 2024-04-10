import express from 'express';
import { and, eq, sql, desc } from 'drizzle-orm';

import { type Resources } from './Service';
import {
  items,
  itemsToUsersCollections,
  itemsToUsersWishlists,
} from '../../models/schema';


export class ItemController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async getItem(id: number) {
    const item = await this.resources.db.query.items.findFirst({
      where: item_ => eq(item_.id, id),
      with: { tags: { with: { tag: true } } },
    });
    if (item) {
      item.tags = item.tags.map(tag => ({ id: tag.tag.id, text: tag.tag.text }));
    }
    return item;
  }

  public async getItemFeed(req: express.Request, res: express.Response) {
    const results = await this.resources.db.query.items.findMany({
      with: { tags: { with: { tag: true } } },
      // TODO: filter out items in user's collection or wishlist
      orderBy: desc(items.createdAt),
    });
    console.log(results);
    if (results) {
      return results.map(item => ({
        ...item,
        tags: item.tags.map(tag => ({ id: tag.tag.id, text: tag.tag.text })),
      }));
    }
    return results;
  }

  public async getUserCollection(id: number) {
    // TODO: if querying another user, omit items with isHidden = true
    const results = await this.resources.db.query.itemsToUsersCollections.findMany({
      where: item_ => eq(item_.userId, id),
      with: { item: { with: { tags: { with: { tag: true } } } } },
    });
    if (results) {
      return results.map(result => ({
        ...result.item,
        notes: result.notes,
        tags: result.item.tags.map(tag => ({ id: tag.tag.id, text: tag.tag.text })),
      }));
    }
    return results;
  }

  public async addItemToCollection(userId: number, itemId: number, notes: string) {
    try {
      const results = await this.resources.db
        .insert(itemsToUsersCollections)
        .values({
          userId,
          itemId,
          notes,
        })
        .onDuplicateKeyUpdate({ set: { itemId: sql`item_id` } });
      return results[0].affectedRows === 1;
    } catch (err) {
      return false;
    }
  }

  public async removeItemFromCollection(userId: number, itemId: number) {
    try {
      const results = await this.resources.db
        .delete(itemsToUsersCollections)
        .where(and(
          eq(itemsToUsersCollections.userId, userId),
          eq(itemsToUsersCollections.itemId, itemId),
        ));
      return results[0].affectedRows === 1;
    } catch (err) {
      return false;
    }
  }


  public async getUserWishlist(id: number) {
    // TODO: if querying another user, omit items with isHidden = true
    const results = await this.resources.db.query.itemsToUsersWishlists.findMany({
      where: item_ => eq(item_.userId, id),
      with: { item: { with: { tags: { with: { tag: true } } } } },
    });
    if (results) {
      return results.map(result => ({
        ...result.item,
        notes: result.notes,
        tags: result.item.tags.map(tag => ({ id: tag.tag.id, text: tag.tag.text })),
      }));
    }
    return results;
  }

  public async addItemToWishlist(userId: number, itemId: number, notes: string) {
    try {
      const results = await this.resources.db
        .insert(itemsToUsersWishlists)
        .values({
          userId,
          itemId,
          notes,
        })
        .onDuplicateKeyUpdate({ set: { itemId: sql`item_id` } });
      return results[0].affectedRows === 1;
    } catch (err) {
      return false;
    }
  }

  public async removeItemFromWishlist(userId: number, itemId: number) {
    try {
      const results = await this.resources.db
        .delete(itemsToUsersWishlists)
        .where(and(
          eq(itemsToUsersWishlists.userId, userId),
          eq(itemsToUsersWishlists.itemId, itemId),
        ));
      console.log(results);
      return results[0].affectedRows === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export class ItemService {
  private readonly controller: ItemController;

  constructor(resources: Resources) {
    this.controller = new ItemController(resources);
  }

  public async handleGetItem(req: express.Request, res: express.Response) {
    try {
      const itemId = parseInt(req.params.itemId, 10);
      const item = await this.controller.getItem(itemId);
      if (item) {
        return item;
      }
      return new Error('Item not found');
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleGetItemFeed(req: express.Request, res: express.Response) {
    try {
      return await this.controller.getItemFeed(req, res);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleGetUserCollection(req: express.Request, res: express.Response) {
    try {
      const userId = req.query.id ? parseInt(req.query.id.toString(), 10) : req.session.userId!;
      return await this.controller.getUserCollection(userId);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleAddItemToCollection(req: express.Request, res: express.Response) {
    try {
      const userId = req.session.userId!;
      const { itemId, notes } = req.body;
      return await this.controller.addItemToCollection(userId, itemId, notes);
      // TODO: (prompt user to) remove item from wishlist if it exists
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleRemoveItemFromCollection(req: express.Request, res: express.Response) {
    try {
      const userId = req.session.userId!;
      const { itemId } = req.params;
      return await this.controller.removeItemFromCollection(userId, parseInt(itemId, 10));
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleGetUserWishlist(req: express.Request, res: express.Response) {
    try {
      const userId = req.query.id ? parseInt(req.query.id.toString(), 10) : req.session.userId!;
      return await this.controller.getUserWishlist(userId);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleAddItemToWishlist(req: express.Request, res: express.Response) {
    try {
      const userId = req.session.userId!;
      const { itemId, notes } = req.body;
      return await this.controller.addItemToWishlist(userId, itemId, notes);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleRemoveItemFromWishlist(req: express.Request, res: express.Response) {
    try {
      const userId = req.session.userId!;
      const { itemId } = req.params;
      return await this.controller.removeItemFromWishlist(userId, parseInt(itemId, 10));
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }
}
