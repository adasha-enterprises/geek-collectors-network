ALTER TABLE `friendship` MODIFY COLUMN `text` varchar(200);--> statement-breakpoint
ALTER TABLE `friendship` DROP INDEX `friendship_text_unique`;