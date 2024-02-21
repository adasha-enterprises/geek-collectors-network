CREATE TABLE `tag` (
	`id` varchar(128) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime,
	`creatorId` serial AUTO_INCREMENT,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	`email` varchar(255),
	`hashedPassword` varbinary(256),
	`salt` varbinary(48),
	`firstName` varchar(20),
	`lastName` varchar(20),
	`username` varchar(20),
	`isAdmin` boolean DEFAULT false,
	`profileImageUrl` varchar(255),
	`isEmailVerified` boolean DEFAULT false,
	`lastLoginAt` datetime,
	`birthDate` date,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `userInterestTag` (
	`id` varchar(128) NOT NULL,
	`userId` serial AUTO_INCREMENT,
	`tagId` varchar(128),
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime,
	CONSTRAINT `userInterestTag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `tag` ADD CONSTRAINT `tag_creatorId_user_id_fk` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userInterestTag` ADD CONSTRAINT `userInterestTag_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userInterestTag` ADD CONSTRAINT `userInterestTag_tagId_tag_id_fk` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE no action ON UPDATE no action;