-- CreateEnum

CREATE TYPE "TYPE_TRANSACTION" AS ENUM ('income', 'outgoing');

-- CreateEnum

CREATE TYPE "TYPE_CURRENCY" AS ENUM ('coins', 'points');

-- CreateTable

CREATE TABLE
    "users" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "balance_coins" INTEGER NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL
    );

-- CreateTable

CREATE TABLE
    "shops" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "conversion_points" INTEGER NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL
    );

-- CreateTable

CREATE TABLE
    "subsidiaries" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "shop_id" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL
    );

-- CreateTable

CREATE TABLE
    "campaigns" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "date_init" TIMESTAMP(3) NOT NULL,
        "date_finish" TIMESTAMP(3) NOT NULL,
        "reward" DOUBLE PRECISION NOT NULL,
        "minimum_amount" INTEGER,
        "shop_id" TEXT,
        "subsidiary_id" TEXT,
        "is_cumulative" BOOLEAN NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL
    );

-- CreateTable

CREATE TABLE
    "rewards" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "points" INTEGER,
        "coins" INTEGER,
        "thumbnail" TEXT,
        "shop_id" TEXT NOT NULL,
        "due_date" DATE,
        "stock" INTEGER,
        "created_at" TIMESTAMP(3) NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL
    );

-- CreateTable

CREATE TABLE
    "transactions" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "subsidiary_id" TEXT NOT NULL,
        "type_transaction" "TYPE_TRANSACTION" NOT NULL,
        "type_currency" "TYPE_CURRENCY" NOT NULL,
        "valor" INTEGER NOT NULL,
        "real_money" INTEGER,
        "created_at" TIMESTAMP(3) NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL
    );

-- CreateTable

CREATE TABLE
    "points" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "shop_id" TEXT NOT NULL
    );

-- CreateIndex

CREATE UNIQUE INDEX "points_id_key" ON "points"("id");

-- CreateIndex

CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex

CREATE UNIQUE INDEX "shops_id_key" ON "shops"("id");

-- CreateIndex

CREATE UNIQUE INDEX "shops_name_key" ON "shops"("name");

-- CreateIndex

CREATE UNIQUE INDEX "subsidiaries_id_key" ON "subsidiaries"("id");

-- CreateIndex

CREATE UNIQUE INDEX "campaigns_id_key" ON "campaigns"("id");

-- CreateIndex

CREATE UNIQUE INDEX "rewards_id_key" ON "rewards"("id");

-- CreateIndex

CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- AddForeignKey

ALTER TABLE "subsidiaries"
ADD
    CONSTRAINT "subsidiaries_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "campaigns"
ADD
    CONSTRAINT "campaigns_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "campaigns"
ADD
    CONSTRAINT "campaigns_subsidiary_id_fkey" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "rewards"
ADD
    CONSTRAINT "rewards_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "transactions"
ADD
    CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "transactions"
ADD
    CONSTRAINT "transactions_subsidiary_id_fkey" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "points"
ADD
    CONSTRAINT "points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "points"
ADD
    CONSTRAINT "points_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;