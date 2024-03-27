CREATE TABLE `item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`creator_id` int,
	`name` varchar(100) NOT NULL,
	`description` text,
	`url` varchar(1000),
	`image_url` varchar(500),
	`brand` varchar(100),
	`price` decimal(8,2),
	`is_for_sale` boolean NOT NULL DEFAULT false,
	`is_for_trade` boolean NOT NULL DEFAULT false,
	CONSTRAINT `item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item_to_tag` (
	`item_id` int NOT NULL,
	`tag_id` int NOT NULL,
	CONSTRAINT `item_to_tag_item_id_tag_id_pk` PRIMARY KEY(`item_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `item_to_user_collection` (
	`item_id` int NOT NULL,
	`user_id` int NOT NULL,
	`is_visible` boolean NOT NULL DEFAULT false,
	`notes` text,
	CONSTRAINT `item_to_user_collection_item_id_user_id_pk` PRIMARY KEY(`item_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `item_to_user_wishlist` (
	`item_id` int NOT NULL,
	`user_id` int NOT NULL,
	`is_visible` boolean NOT NULL DEFAULT false,
	`notes` text,
	CONSTRAINT `item_to_user_wishlist_item_id_user_id_pk` PRIMARY KEY(`item_id`,`user_id`)
);
--> statement-breakpoint
ALTER TABLE `item` ADD CONSTRAINT `item_creator_id_user_id_fk` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_to_tag` ADD CONSTRAINT `item_to_tag_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_to_tag` ADD CONSTRAINT `item_to_tag_tag_id_tag_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_to_user_collection` ADD CONSTRAINT `item_to_user_collection_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_to_user_collection` ADD CONSTRAINT `item_to_user_collection_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_to_user_wishlist` ADD CONSTRAINT `item_to_user_wishlist_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_to_user_wishlist` ADD CONSTRAINT `item_to_user_wishlist_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;