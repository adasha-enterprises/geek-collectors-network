CREATE TABLE `tag` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL,
	`creatorId` int,
	`text` varchar(50) NOT NULL,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`),
	CONSTRAINT `tag_text_unique` UNIQUE(`text`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`lastLoginAt` timestamp,
	`email` varchar(255) NOT NULL,
	`isEmailVerified` boolean DEFAULT false,
	`hashedPassword` varchar(128) NOT NULL,
	`salt` varchar(128) NOT NULL,
	`firstName` varchar(20),
	`lastName` varchar(20),
	`displayName` varchar(20),
	`profileImageUrl` varchar(255),
	`birthDate` date,
	`isAdmin` boolean DEFAULT false,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_to_tag` (
	`userId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `user_to_tag_userId_tagId_pk` PRIMARY KEY(`userId`,`tagId`)
);
--> statement-breakpoint
ALTER TABLE `user_to_tag` ADD CONSTRAINT `user_to_tag_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_to_tag` ADD CONSTRAINT `user_to_tag_tagId_tag_id_fk` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE cascade ON UPDATE no action;