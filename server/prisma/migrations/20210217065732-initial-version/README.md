# Migration `20210217065732-initial-version`

This migration has been generated by Yuval Hazaz at 2/17/2021, 8:57:32 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Group" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Team" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersId" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT,
    "groupId" TEXT,
    "id" TEXT NOT NULL,
    "lastName" TEXT,
    "managerId" TEXT,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.username_unique" ON "User"("username")

ALTER TABLE "Team" ADD FOREIGN KEY("usersId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "User" ADD FOREIGN KEY("groupId")REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "User" ADD FOREIGN KEY("managerId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210217065732-initial-version
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,41 @@
+datasource postgres {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Group {
+  createdAt DateTime @default(now())
+  id        String   @id @default(cuid())
+  name      String?
+  updatedAt DateTime @updatedAt
+  users     User[]
+}
+
+model Team {
+  createdAt DateTime @default(now())
+  id        String   @id @default(cuid())
+  updatedAt DateTime @updatedAt
+  users     User?    @relation(fields: [usersId])
+  usersId   String?
+}
+
+model User {
+  createdAt DateTime @default(now())
+  employees User[]   @relation(name: "employees")
+  firstName String?
+  group     Group?   @relation(fields: [groupId])
+  groupId   String?
+  id        String   @id @default(cuid())
+  lastName  String?
+  manager   User?    @relation(name: "employees", fields: [managerId])
+  managerId String?
+  password  String
+  roles     String[]
+  teams     Team[]
+  updatedAt DateTime @updatedAt
+  username  String   @unique
+}
```

