-- CreateEnum
CREATE TYPE "BuyRequestStatus" AS ENUM ('DRAFT', 'ACTIVE', 'FULFILLED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "BuyRequest" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "maxPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "conditionCode" TEXT,
    "languageCode" TEXT,
    "isFoil" BOOLEAN,
    "isGraded" BOOLEAN,
    "gradingCompany" TEXT,
    "minGradingScore" TEXT,
    "comments" TEXT,
    "status" "BuyRequestStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BuyRequest_buyerId_idx" ON "BuyRequest"("buyerId");

-- CreateIndex
CREATE INDEX "BuyRequest_productId_idx" ON "BuyRequest"("productId");

-- CreateIndex
CREATE INDEX "BuyRequest_status_idx" ON "BuyRequest"("status");

-- CreateIndex
CREATE INDEX "BuyRequest_maxPrice_idx" ON "BuyRequest"("maxPrice");

-- AddForeignKey
ALTER TABLE "BuyRequest" ADD CONSTRAINT "BuyRequest_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyRequest" ADD CONSTRAINT "BuyRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
