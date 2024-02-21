-- CreateTable
CREATE TABLE "Product2" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productCategory" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Product2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product2_productName_key" ON "Product2"("productName");

-- CreateIndex
CREATE UNIQUE INDEX "Product2_serialNumber_key" ON "Product2"("serialNumber");
