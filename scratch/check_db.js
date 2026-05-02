const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log('--- Officers ---');
  console.log(users.map(u => ({ id: u.employeeId, name: u.name, hasPassword: !!u.passwordHash })));

  const citizens = await prisma.citizen.findMany();
  console.log('--- Citizens ---');
  console.log(citizens.map(c => ({ aadhaar: c.aadhaar, name: c.fullName, hasPassword: !!c.passwordHash })));
}

check().finally(() => prisma.$disconnect());
