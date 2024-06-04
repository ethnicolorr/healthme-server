import { Prisma, PrismaClient } from '@prisma/client';
import readXlsxFile from 'read-excel-file/node';
import { catSchema, recSchema, advSchema } from './res/schemas';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const filepath = 'prisma/res/recommendations.xlsx';

async function main() {
  await prisma.user.upsert({
    where: { email: 'test@mail.ru' },
    update: {},
    create: {
      email: 'test@mail.ru',
      name: 'Юлия',
      birthDate: '2001-11-06T00:00:00.000Z',
      gender: 'FEMALE',
      password: bcrypt.hashSync('testPassword', 10),
      appointments: {
        create: {
          name: 'Стоматолог',
          type: 'APPOINTMENT',
          startedAt: '2024-06-08T11:00:00.000Z',
          comment: 'Чистка зубов',
        },
      },
      notes: {
        create: [
          {
            name: 'Боль в горле',
            type: 'HARD',
            startedAt: '2024-06-05T12:15:00.000Z',
          },
          {
            name: 'Кашель',
            type: 'MEDIUM',
            startedAt: '2024-06-05T15:00:00.000Z',
            comment: 'С мокротой',
          },
          {
            name: 'Парацетамол',
            type: 'MEDICINE',
            startedAt: '2024-06-05T18:00:00.000Z',
            comment: '1 таблетка',
          },
          {
            name: 'Температура',
            type: 'TEMPERATURE',
            startedAt: '2024-06-05T17:30:00.000Z',
            comment: '37.8',
          },
        ],
      },
      procedures: {
        create: {
          name: 'Офтальмолог',
          type: 'APPOINTMENT',
          lastVisit: '2023-06-07T00:00:00.000Z',
          frequency: 365,
        },
      },
    },
  });

  await readXlsxFile(filepath, { sheet: 1, schema: catSchema }).then(
    async ({ rows }) => {
      for (const row of rows) {
        await prisma.category.create({
          data: row as Prisma.CategoryCreateInput,
        });
      }
    },
  );

  await readXlsxFile(filepath, { sheet: 2, schema: recSchema }).then(
    async ({ rows }) => {
      for (const row of rows) {
        await prisma.recommendation.create({
          data: row as Prisma.RecommendationCreateInput,
        });
      }
    },
  );

  await readXlsxFile(filepath, { sheet: 3, schema: advSchema }).then(
    async ({ rows }) => {
      for (const row of rows) {
        await prisma.advice.create({
          data: row as Prisma.AdviceCreateInput,
        });
      }
    },
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
