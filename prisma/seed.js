const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding development database...');

  // 1. Create Admin Officer
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { employeeId: 'EMP001' },
    update: { passwordHash: adminPassword },
    create: {
      employeeId: 'EMP001',
      name: 'Admin Officer',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  // 2. Create Test Citizen
  const citizenPassword = await bcrypt.hash('citizen123', 10);
  await prisma.citizen.upsert({
    where: { aadhaar: '618655223080' },
    update: { passwordHash: citizenPassword },
    create: {
      citizenId: 'CIT618655223080',
      fullName: 'Ajith Kumar',
      dob: new Date('1995-05-15'),
      gender: 'MALE',
      maritalStatus: 'SINGLE',
      fathersName: 'Murugan',
      aadhaar: '618655223080',
      mobileNumber: '9876543210',
      wardNumber: '5',
      houseNumber: '42/A',
      pincode: '606601',
      houseOwnership: 'OWNED',
      rationCardType: 'APL',
      familyMembersCount: 4,
      annualIncome: 150000,
      passwordHash: citizenPassword,
    },
  });

  console.log('Seed completed successfully! Use these credentials:');
  console.log('Officer -> ID: EMP001, Pass: admin123');
  console.log('Citizen -> Aadhaar: 618655223080, Pass: citizen123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
