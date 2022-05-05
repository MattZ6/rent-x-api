-- DropForeignKey
ALTER TABLE "user_avatars" DROP CONSTRAINT "user_avatars_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_avatars" ADD CONSTRAINT "user_avatars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
