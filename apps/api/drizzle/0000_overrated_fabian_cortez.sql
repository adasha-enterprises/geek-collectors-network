CREATE TABLE `friendship` (
	`inviter_id` int NOT NULL,
	`invitee_id` int NOT NULL,
	`text` varchar(200) NOT NULL,
	`status` enum('pending','accepted','rejected','blocked') NOT NULL DEFAULT 'pending',
	CONSTRAINT `friendship_inviter_id_invitee_id_pk` PRIMARY KEY(`inviter_id`,`invitee_id`),
	CONSTRAINT `friendship_text_unique` UNIQUE(`text`)
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL,
	`creator_id` int,
	`text` varchar(20) NOT NULL,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`),
	CONSTRAINT `tag_text_unique` UNIQUE(`text`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`last_login_at` timestamp,
	`email` varchar(255) NOT NULL,
	`hashed_password` varchar(128) NOT NULL,
	`salt` varchar(128) NOT NULL,
	`first_name` varchar(20),
	`last_name` varchar(20),
	`display_name` varchar(20),
	`profile_image_url` varchar(255),
	`birth_date` date,
	`about` varchar(1000),
	`twitter` varchar(50),
	`facebook` varchar(50),
	`instagram` varchar(50),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_to_tag` (
	`user_id` int NOT NULL,
	`tag_id` int NOT NULL,
	CONSTRAINT `user_to_tag_user_id_tag_id_pk` PRIMARY KEY(`user_id`,`tag_id`)
);
--> statement-breakpoint
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_inviter_id_user_id_fk` FOREIGN KEY (`inviter_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_invitee_id_user_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag` ADD CONSTRAINT `tag_creator_id_user_id_fk` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_to_tag` ADD CONSTRAINT `user_to_tag_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_to_tag` ADD CONSTRAINT `user_to_tag_tag_id_tag_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE cascade ON UPDATE no action;