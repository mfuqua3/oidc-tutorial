-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "allocatedTacos" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taco" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "createdFromId" INTEGER NOT NULL,
    "spentWithId" INTEGER,

    CONSTRAINT "Taco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TacoAwardPayer" (
    "tacoAwardId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TacoAwardPayer_pkey" PRIMARY KEY ("tacoAwardId","userId")
);

-- CreateTable
CREATE TABLE "TacoAwardPayee" (
    "tacoAwardId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TacoAwardPayee_pkey" PRIMARY KEY ("tacoAwardId","userId")
);

-- CreateTable
CREATE TABLE "TacoAward" (
    "id" SERIAL NOT NULL,
    "payerId" TEXT NOT NULL,
    "payeeId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TacoAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TacoPurchase" (
    "id" SERIAL NOT NULL,
    "payerId" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "TacoPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TacoTruckItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "TacoTruckItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TacoAward_id_payeeId_key" ON "TacoAward"("id", "payeeId");

-- CreateIndex
CREATE UNIQUE INDEX "TacoAward_id_payerId_key" ON "TacoAward"("id", "payerId");

-- AddForeignKey
ALTER TABLE "Taco" ADD CONSTRAINT "Taco_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taco" ADD CONSTRAINT "Taco_createdFromId_fkey" FOREIGN KEY ("createdFromId") REFERENCES "TacoAward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taco" ADD CONSTRAINT "Taco_spentWithId_fkey" FOREIGN KEY ("spentWithId") REFERENCES "TacoPurchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacoAwardPayer" ADD CONSTRAINT "TacoAwardPayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacoAwardPayee" ADD CONSTRAINT "TacoAwardPayee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacoAward" ADD CONSTRAINT "TacoAward_id_payerId_fkey" FOREIGN KEY ("id", "payerId") REFERENCES "TacoAwardPayer"("tacoAwardId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacoAward" ADD CONSTRAINT "TacoAward_id_payeeId_fkey" FOREIGN KEY ("id", "payeeId") REFERENCES "TacoAwardPayee"("tacoAwardId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacoPurchase" ADD CONSTRAINT "TacoPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacoPurchase" ADD CONSTRAINT "TacoPurchase_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "TacoTruckItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
